"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const ts_morph_1 = require("ts-morph");
const node_html_parser_1 = require("node-html-parser");
const JSX_STRING = /\(\s*(<.*)>\s*\)/gs;
class ReactStoreRedux extends Generator {
    tsProject;
    constructor(args, opts) {
        super(args, opts);
        this.tsProject = new ts_morph_1.Project();
    }
    authFilesFiles = ['loginComponents'];
    writing() {
        this._copyStoreFiles();
        this._updatePackageJson();
        this._updateAppTsx();
        this._updateRoutes();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyStoreFiles() {
        this.authFilesFiles.forEach(file => {
            const destinationPath = `./src/configs/auth`;
            this._copyTpl(file, destinationPath);
        });
    }
    _updatePackageJson() {
        const filePath = "package.json";
        let packagesData = this.fs.readJSON(this.destinationPath(filePath));
        packagesData["dependencies"]["@axa-fr/react-oidc"] = "^6.9.2";
        this.fs.writeJSON(this.destinationPath(filePath), packagesData);
    }
    _updateAppTsx() {
        const appTsxFilePath = this.fs.read(this.destinationPath('./src/App.tsx'));
        const appTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath("./src/App.tsx"), appTsxFilePath, { overwrite: true });
        const importDeclarations = [
            {
                namedImports: ['configurationIdentityServer'],
                moduleSpecifier: "./configs/auth/Configurations",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            }
        ];
        appTsxSourceFile.addImportDeclarations(importDeclarations);
        const htmlBody = this._parseJSXFile(appTsxFilePath);
        appTsxSourceFile.getFunction('App')?.setBodyText(`return ${htmlBody}`);
        this.fs.write(this.destinationPath('./src/App.tsx'), appTsxSourceFile.getText());
    }
    _parseJSXFile(appTsxFilePath) {
        let matches = JSX_STRING.exec(appTsxFilePath);
        if (matches) {
            let HTML = matches[1] + ">";
            const root = (0, node_html_parser_1.default)(HTML);
            let htmlRootBody = (0, node_html_parser_1.default)('(<OidcProvider configuration={configurationIdentityServer}>' + '\n' + root.toString() + '\n' + '</OidcProvider>)');
            return htmlRootBody.toString();
        }
    }
    _updateRoutes() {
        const routesTsxFilePath = this.fs.read(this.destinationPath('./src/configs/router/routes.config.tsx'));
        const routesTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath("./src/configs/router/routes.config.tsx"), routesTsxFilePath, { overwrite: true });
        const importDeclarations = [
            {
                defaultImport: 'MultiAuthProvider',
                moduleSpecifier: "../auth/MultiAuthProvider",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            }
        ];
        routesTsxSourceFile.addImportDeclarations(importDeclarations);
        // console.log("routes function",routesTsxFilePath)
        const routesFunction = routesTsxSourceFile.getVariableDeclaration('routes');
        const routesArrowFunction = routesFunction?.getDescendantsOfKind(ts_morph_1.SyntaxKind.ArrowFunction);
        if (!routesArrowFunction)
            return;
        const routes = routesArrowFunction[0].getDescendantsOfKind(ts_morph_1.SyntaxKind.Block)[0].getVariableDeclaration('all_routes')?.getFirstChildByKindOrThrow(ts_morph_1.SyntaxKind.ArrayLiteralExpression);
        if (!routes)
            return;
        routes?.addElement(`{ path: "/login", element: <MultiAuthProvider /> },`);
        this.fs.write(this.destinationPath('./src/configs/router/routes.config.tsx'), routesTsxSourceFile.getText());
    }
}
exports.default = ReactStoreRedux;
//# sourceMappingURL=index.js.map