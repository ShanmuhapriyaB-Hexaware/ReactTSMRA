"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const ts_morph_1 = require("ts-morph");
const JSX_STRING = /\(\s*(<.*)>\s*\)/gs;
class MUIFramework extends Generator {
    tsProject;
    constructor(args, opts) {
        super(args, opts);
        this.tsProject = new ts_morph_1.Project();
    }
    commonMuiFiles = ['Store'];
    muiFiles = ['theme'];
    modelFiles = ['models'];
    configFiles = ['navigation'];
    dependencyPackages = [
        {
            name: "antd",
            version: "^5.4.7"
        }
    ];
    writing() {
        this._copyAntdFiles();
        this._updatePackageJson();
        this._updateRoutesConfig();
        this._updateRootReducer();
        this._updateHomeTsx();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyAntdFiles() {
        this.commonMuiFiles.forEach(file => {
            const templatePath = `common${file}`;
            const destinationPath = `./src/common/${file.toLowerCase()}`;
            this._copyTpl(templatePath, destinationPath);
        });
        this.configFiles.forEach(file => {
            const templatePath = `${file}`;
            const destinationPath = `./src/configs/${file}`;
            this._copyTpl(templatePath, destinationPath);
        });
        this.muiFiles.forEach(file => {
            const templatePath = `${file}`;
            const destinationPath = `./src/${file}`;
            this._copyTpl(templatePath, destinationPath);
        });
        this.modelFiles.forEach(file => {
            const templatePath = `${file}`;
            const destinationPath = `./src/${file}`;
            this._copyTpl(templatePath, destinationPath);
        });
    }
    _updatePackageJson() {
        const filePath = "package.json";
        let packagesData = this.fs.readJSON(this.destinationPath(filePath));
        this.dependencyPackages.forEach(packageObj => {
            packagesData["dependencies"][packageObj.name] = packageObj.version;
        });
        this.fs.writeJSON(this.destinationPath(filePath), packagesData);
    }
    _updateRoutesConfig() {
        const routesConfigFilePath = this.fs.read(this.destinationPath('./src/configs/router/routes.config.tsx'));
        const routesSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/configs/router/routes.config.tsx'), routesConfigFilePath, { overwrite: true });
        const importDeclarations = [
            {
                defaultImport: 'WebLayout',
                moduleSpecifier: "../../theme/pages/Layout",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            }
        ];
        routesSourceFile.addImportDeclarations(importDeclarations);
        const routesFunction = routesSourceFile.getVariableDeclaration('routes');
        const routesArrayFunction = routesFunction?.getDescendantsOfKind(ts_morph_1.SyntaxKind.ArrowFunction);
        if (!routesArrayFunction)
            return;
        const routesObject = routesArrayFunction[0]?.getDescendantsOfKind(ts_morph_1.SyntaxKind.Block)[0].getVariableDeclaration('all_routes');
        const routesArrayObject = routesObject?.getFirstChildByKindOrThrow(ts_morph_1.SyntaxKind.ArrayLiteralExpression);
        if (!routesArrayObject)
            return;
        routesArrayObject.addElements([
            `
            {
                element: <WebLayout />,
                children: [...homeRoutes]
            },
            `,
        ]);
        this.fs.write(this.destinationPath('./src/configs/router/routes.config.tsx'), routesSourceFile.getText());
    }
    _updateRootReducer() {
        const rootReducerFilePath = this.fs.read(this.destinationPath('./src/store/root-reducer.ts'));
        const rootReducerSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/store/root-reducer.ts'), rootReducerFilePath, { overwrite: true });
        const importDeclarations = [
            {
                defaultImport: 'themeSlice',
                moduleSpecifier: "../theme/store",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            },
            {
                defaultImport: 'commonSlice',
                moduleSpecifier: "../common/store",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            }
        ];
        rootReducerSourceFile.addImportDeclarations(importDeclarations);
        const rootReducerFunction = rootReducerSourceFile.getVariableDeclaration('rootReducer')?.getDescendantsOfKind(ts_morph_1.SyntaxKind.CallExpression);
        if (!rootReducerFunction)
            return;
        const rootReducerObject = rootReducerFunction[0]?.getFirstChildByKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
        if (!rootReducerObject)
            return;
        console.log("rootReducer", rootReducerObject);
        rootReducerObject.insertShorthandPropertyAssignments(0, [
            {
                kind: ts_morph_1.StructureKind.ShorthandPropertyAssignment,
                name: 'themeSlice'
            },
            {
                kind: ts_morph_1.StructureKind.ShorthandPropertyAssignment,
                name: 'commonSlice'
            }
        ]);
        this.fs.write(this.destinationPath('./src/store/root-reducer.ts'), rootReducerSourceFile.getText());
    }
    _updateHomeTsx() {
        const homeTsxFilePath = this.fs.read(this.destinationPath('./src/main/home/pages/Home.tsx'));
        const homeTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/main/home/pages/Home.tsx'), homeTsxFilePath, { overwrite: true });
        const importDeclarations = [
            {
                namedImports: ['useEffect'],
                moduleSpecifier: "react",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            },
            {
                namedImports: ['setNavigation'],
                moduleSpecifier: "../../../common/store/slices/navigation.slice",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            },
            {
                namedImports: ['getHomeNavigation'],
                moduleSpecifier: "../../../configs/navigation/navigation.config",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            },
            {
                namedImports: ['useDispatch'],
                moduleSpecifier: "../../../store",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            },
        ];
        homeTsxSourceFile.addImportDeclarations(importDeclarations);
        const homeTsxBlock = homeTsxSourceFile.getFunction('Home')?.getDescendantsOfKind(ts_morph_1.SyntaxKind.Block)[0];
        if (!homeTsxBlock)
            return;
        homeTsxBlock.insertVariableStatement(1, {
            declarationKind: ts_morph_1.VariableDeclarationKind.Const,
            declarations: [{
                    kind: ts_morph_1.StructureKind.VariableDeclaration,
                    name: "dispatch",
                    initializer: "useDispatch()"
                }]
        });
        const expressionsObj = homeTsxBlock;
        if (!expressionsObj)
            return;
        expressionsObj.insertStatements(3, `
            useEffect(() => {
                dispatch(setNavigation(getHomeNavigation()))
            }, [])
            `);
        this.fs.write(this.destinationPath('./src/main/home/pages/Home.tsx'), homeTsxSourceFile.getText());
    }
}
exports.default = MUIFramework;
//# sourceMappingURL=index.js.map