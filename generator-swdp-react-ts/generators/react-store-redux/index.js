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
    rootStoreFiles = ['store'];
    componentStoreFiles = ['home'];
    writing() {
        this._copyStoreFiles();
        this._updatePackageJson();
        this._updateAppTsx();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyStoreFiles() {
        this.rootStoreFiles.forEach(file => {
            const destinationPath = `./src/${file}`;
            this._copyTpl(file, destinationPath);
        });
        this.componentStoreFiles.forEach(file => {
            const templatePath = `${file}Store`;
            const destinationPath = `./src/main/${file}/store`;
            this._copyTpl(templatePath, destinationPath);
        });
    }
    _updatePackageJson() {
        const filePath = "package.json";
        let packagesData = this.fs.readJSON(this.destinationPath(filePath));
        packagesData["dependencies"]["@reduxjs/toolkit"] = "^1.9.1";
        packagesData["dependencies"]["react-redux"] = "^8.0.5";
        this.fs.writeJSON(this.destinationPath(filePath), packagesData);
    }
    _updateAppTsx() {
        const appTsxFilePath = this.fs.read(this.destinationPath('./src/App.tsx'));
        const appTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath("./src/App.tsx"), appTsxFilePath, { overwrite: true });
        const importDeclarations = [
            {
                namedImports: ['Provider as ReduxProvider'],
                moduleSpecifier: "react-redux",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            },
            {
                defaultImport: 'store',
                moduleSpecifier: "./store",
                kind: ts_morph_1.StructureKind.ImportDeclaration
            }
        ];
        appTsxSourceFile.addImportDeclarations(importDeclarations);
        const htmlBody = this._parseJSXFile(appTsxFilePath);
        appTsxSourceFile.getFunction('App')?.setBodyText(`return ${htmlBody}`);
        this.fs.write(this.destinationPath('./src/App.tsx'), appTsxSourceFile.getText());
    }
    _parseJSXFile(appTsxFilePath) {
        console.log(appTsxFilePath);
        let matches = JSX_STRING.exec(appTsxFilePath);
        if (matches) {
            let HTML = matches[1] + ">";
            console.log("parsed html");
            console.log(HTML);
            const root = (0, node_html_parser_1.default)(HTML);
            let htmlRootBody = (0, node_html_parser_1.default)(`(<ReduxProvider store={store}>${root.toString()}</ReduxProvider>)`);
            console.log("parsed HTML Body", htmlRootBody.toString());
            return htmlRootBody.toString();
        }
    }
}
exports.default = ReactStoreRedux;
//# sourceMappingURL=index.js.map