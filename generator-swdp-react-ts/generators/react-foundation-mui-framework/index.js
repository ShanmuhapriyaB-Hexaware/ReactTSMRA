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
    muiFiles = ['components', 'store'];
    layoutFiles = ['theme'];
    writing() {
        this._copyMUIFiles();
        this._updatePackageJson();
        this._updateRoutesConfig();
        this._updateRootReducer();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyMUIFiles() {
        const allMUIFiles = [...this.muiFiles];
        const allLayoutFiles = [...this.layoutFiles];
        allMUIFiles.forEach(file => {
            const destinationPath = `./src/common/${file}`;
            this._copyTpl(file, destinationPath);
        });
        allLayoutFiles.forEach(file => {
            const destinationPath = `./src/${file}`;
        });
    }
    _updatePackageJson() {
        const filePath = "package.json";
        let packagesData = this.fs.readJSON(this.destinationPath(filePath));
        packagesData["dependencies"]["@mui/icons-material"] = "^5.11.16";
        packagesData["dependencies"]["@mui/material"] = "^5.12.3";
        packagesData["dependencies"]["@mui/lab"] = "^5.0.0-alpha.128";
        packagesData["dependencies"]["@emotion/react"] = "^11.10.6";
        packagesData["dependencies"]["@emotion/styled"] = "^11.10.6";
        this.fs.writeJSON(this.destinationPath(filePath), packagesData);
    }
    _updateRoutesConfig() {
        const routesConfigFilePath = this.fs.read(this.destinationPath('./src/configs/router/routes.config.tsx'));
        const routesSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/configs/router/routes.config.tsx'), routesConfigFilePath, { overwrite: true });
        const importDeclarations = [
            {
                defaultImport: 'Layout',
                moduleSpecifier: "../../theme/layout/pages/Layout",
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
                element: <Layout />,
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
                moduleSpecifier: "../common/components/layout/store",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            },
            {
                defaultImport: 'layoutSlice',
                moduleSpecifier: "../common/components/layout/store",
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
                name: 'layoutSlice'
            }
        ]);
        this.fs.write(this.destinationPath('./src/store/root-reducer.ts'), rootReducerSourceFile.getText());
    }
}
exports.default = MUIFramework;
//# sourceMappingURL=index.js.map