import * as Generator from 'yeoman-generator';
import parse from 'node-html-parser';
import { ArrowFunction, ImportDeclarationStructure, ObjectLiteralExpression, Project, StructureKind, SyntaxKind } from 'ts-morph';

const JSX_STRING = /\(\s*(<.*)>\s*\)/gs

class MUIFramework extends Generator {

    tsProject: Project;

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
        this.tsProject = new Project()
    }

    muiFiles = ['components']

    writing() {
        this._copyMUIFiles();
        this._updatePackageJson();
        this._updateRoutesConfig();
        this._updateRootReducer();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any) {
        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath),
            options ?? {}
        )
    }

    _copyMUIFiles() {
        const allMUIFiles = [...this.muiFiles]

        allMUIFiles.forEach(file => {
            const destinationPath = `./src/common/${file}`
            this._copyTpl(file, destinationPath);
        });
    }

    _updatePackageJson() {
        const filePath: string = "package.json"
        let packagesData: any = this.fs.readJSON(this.destinationPath(filePath))
        packagesData["dependencies"]["@mui/icons-material"] = "^5.11.16"
        packagesData["dependencies"]["@mui/material"] = "^5.12.3"
        packagesData["dependencies"]["@mui/lab"] = "^5.0.0-alpha.128"
        packagesData["dependencies"]["@emotion/react"] = "^11.10.6"
        packagesData["dependencies"]["@emotion/styled"] = "^11.10.6"
        this.fs.writeJSON(this.destinationPath(filePath), packagesData)
    }

    _updateRoutesConfig() {
        const routesConfigFilePath = this.fs.read(this.destinationPath('./src/configs/router/routes.config.tsx'));
        const routesSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/configs/router/routes.config.tsx'), routesConfigFilePath, { overwrite: true });
        const importDeclarations: ImportDeclarationStructure[] = [
            {
                defaultImport: 'Layout',
                moduleSpecifier: "../../common/components/layout/layout",
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
                element: <Layout />,
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
                moduleSpecifier: "../common/components/layout/store",
                kind: StructureKind.ImportDeclaration
            },
            {
                defaultImport: 'layoutSlice',
                moduleSpecifier: "../common/components/layout/store",
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
                    name: 'layoutSlice'
                }
            ]
        )

        this.fs.write(this.destinationPath('./src/store/root-reducer.ts'), rootReducerSourceFile.getText())
    }

}

export default MUIFramework;