import * as Generator from 'yeoman-generator';
import parse from 'node-html-parser';
import { ImportDeclarationStructure, ObjectLiteralExpression, Project, StructureKind, SyntaxKind, VariableDeclarationKind } from 'ts-morph';
import { Packages } from './types';

class MUIFramework extends Generator {

    tsProject: Project;

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
        this.tsProject = new Project()
    }

    commonMuiFiles = ['Store']
    muiFiles = ['theme']
    modelFiles = ['models']
    configFiles = ['navigation']

    dependencyPackages: Packages[] = [
        {
            name: "antd",
            version: "^5.4.7"
        }
    ]

    writing() {
        this._copyAntdFiles();
        this._updatePackageJson();
        this._updateRoutesConfig();
        this._updateRootReducer();
        this._updateHomeTsx();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any) {
        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath),
            options ?? {}
        )
    }

    _copyAntdFiles() {
        this.commonMuiFiles.forEach(file => {
            const templatePath = `common${file}`
            const destinationPath = `./src/common/${file.toLowerCase()}`
            this._copyTpl(templatePath, destinationPath);
        });

        this.configFiles.forEach(file => {
            const templatePath = `${file}`
            const destinationPath = `./src/configs/${file}`
            this._copyTpl(templatePath, destinationPath);
        });

        this.muiFiles.forEach(file => {
            const templatePath = `${file}`
            const destinationPath = `./src/${file}`
            this._copyTpl(templatePath, destinationPath);
        });

        this.modelFiles.forEach(file => {
            const templatePath = `${file}`
            const destinationPath = `./src/${file}`
            this._copyTpl(templatePath, destinationPath);
        });
    }

    _updatePackageJson() {
        const filePath: string = "package.json"
        let packagesData: any = this.fs.readJSON(this.destinationPath(filePath))
        this.dependencyPackages.forEach(packageObj => {
            packagesData["dependencies"][packageObj.name] = packageObj.version
        })
        this.fs.writeJSON(this.destinationPath(filePath), packagesData)
    }

    _updateRoutesConfig() {
        const routesConfigFilePath = this.fs.read(this.destinationPath('./src/configs/router/routes.config.tsx'));
        const routesSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/configs/router/routes.config.tsx'), routesConfigFilePath, { overwrite: true });
        const importDeclarations: ImportDeclarationStructure[] = [
            {
                defaultImport: 'WebLayout',
                moduleSpecifier: "../../theme/pages/Layout",
                kind: StructureKind.ImportDeclaration
            }
        ]

        routesSourceFile.addImportDeclarations(importDeclarations)

        const routesFunction = routesSourceFile.getVariableDeclaration('routes');
        const routesArrayFunction = routesFunction?.getDescendantsOfKind(SyntaxKind.ArrowFunction);

        if (!routesArrayFunction) return;
        const routesObject = routesArrayFunction[0]?.getDescendantsOfKind(SyntaxKind.Block)[0].getVariableDeclaration('all_routes');

        const routesArrayObject = routesObject?.getFirstChildByKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        if (!routesArrayObject) return;

        routesArrayObject.addElements([
            `
            {
                element: <WebLayout />,
                children: [...homeRoutes]
            },
            `,
        ]
        );

        this.fs.write(this.destinationPath('./src/configs/router/routes.config.tsx'), routesSourceFile.getText())
    }

    _updateRootReducer() {
        const rootReducerFilePath = this.fs.read(this.destinationPath('./src/store/root-reducer.ts'));
        const rootReducerSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/store/root-reducer.ts'), rootReducerFilePath, { overwrite: true });
        const importDeclarations: ImportDeclarationStructure[] = [
            {
                defaultImport: 'themeSlice',
                moduleSpecifier: "../theme/store",
                kind: StructureKind.ImportDeclaration
            },
            {
                defaultImport: 'commonSlice',
                moduleSpecifier: "../common/store",
                kind: StructureKind.ImportDeclaration
            }
        ]
        rootReducerSourceFile.addImportDeclarations(importDeclarations);

        const rootReducerFunction = rootReducerSourceFile.getVariableDeclaration('rootReducer')?.getDescendantsOfKind(SyntaxKind.CallExpression);
        if (!rootReducerFunction) return;

        const rootReducerObject = rootReducerFunction[0]?.getFirstChildByKindOrThrow(SyntaxKind.ObjectLiteralExpression);
        if (!rootReducerObject) return;

        console.log("rootReducer", rootReducerObject);

        rootReducerObject.insertShorthandPropertyAssignments(0,
            [
                {
                    kind: StructureKind.ShorthandPropertyAssignment,
                    name: 'themeSlice'
                },
                {
                    kind: StructureKind.ShorthandPropertyAssignment,
                    name: 'commonSlice'
                }
            ]
        )

        this.fs.write(this.destinationPath('./src/store/root-reducer.ts'), rootReducerSourceFile.getText())
    }

    _updateHomeTsx() {
        const homeTsxFilePath = this.fs.read(this.destinationPath('./src/main/home/pages/Home.tsx'));
        const homeTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/main/home/pages/Home.tsx'), homeTsxFilePath, { overwrite: true });
        const importDeclarations: ImportDeclarationStructure[] = [
            {
                namedImports: ['useEffect'],
                moduleSpecifier: "react",
                kind: StructureKind.ImportDeclaration
            },
            {
                namedImports: ['setNavigation'],
                moduleSpecifier: "../../../common/store/slices/navigation.slice",
                kind: StructureKind.ImportDeclaration
            },
            {
                namedImports: ['getHomeNavigation'],
                moduleSpecifier: "../../../configs/navigation/navigation.config",
                kind: StructureKind.ImportDeclaration
            },
            {
                namedImports: ['useDispatch'],
                moduleSpecifier: "../../../store",
                kind: StructureKind.ImportDeclaration
            },
            {
                namedImports: ['Typography'],
                moduleSpecifier: "antd",
                kind: StructureKind.ImportDeclaration
            }
        ]

        homeTsxSourceFile.addImportDeclarations(importDeclarations)

        const homeTsxBlock = homeTsxSourceFile.getFunction('Home')?.getDescendantsOfKind(SyntaxKind.Block)[0]

        if (!homeTsxBlock) return;

        homeTsxBlock.insertVariableStatements(1, [
            {
                declarationKind: VariableDeclarationKind.Const,
                declarations: [{
                    kind: StructureKind.VariableDeclaration,
                    name: "{Title}",
                    initializer: "Typography"
                }]
            },
            {
                declarationKind: VariableDeclarationKind.Const,
                declarations: [{
                    kind: StructureKind.VariableDeclaration,
                    name: "dispatch",
                    initializer: "useDispatch()"
                }]
            }
        ])

        const expressionsObj = homeTsxBlock

        if (!expressionsObj) return;

        expressionsObj.insertStatements(3,
            `
            useEffect(() => {
                dispatch(setNavigation(getHomeNavigation()))
            }, [])
            `
        )

        const htmlBody = parse('(<div className="Home">' + '\n' + "<Title level={1}>Welcome To RapidX</Title>" + '\n' + '</div>)').toString();

        homeTsxBlock.removeStatements([4,4])

        this.fs.write(this.destinationPath('./src/main/home/pages/Home.tsx'), homeTsxSourceFile.getText())
    }
}

export default MUIFramework;