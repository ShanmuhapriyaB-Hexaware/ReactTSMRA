"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class ReactBase extends Generator {
    _mraInput;
    rootFiles = ['public', 'src', '.gitignore', 'index.html', 'tsconfig.json', 'tsconfig.node.json', 'tsconfig.prod.json', 'svgTransform.cjs', 'vite.config.ts'];
    editableFiles = ['package.json'];
    constructor(args, opts) {
        super(args, opts);
    }
    initializing() {
        this._mraInput = this.options.data;
    }
    writing() {
        this._copyRootFiles();
        this._updatePackageJson();
    }
    _copyTpl(templatePath, destinationPath, options) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), options ?? {});
    }
    _copyRootFiles() {
        const allRootFiles = [...this.rootFiles, ...this.editableFiles];
        const templateInput = { project: this._mraInput };
        allRootFiles.forEach(file => {
            const destinationPath = `./${file}`;
            if (this.editableFiles.includes(file)) {
                this._copyTpl(file, destinationPath, templateInput);
            }
            else {
                this._copyTpl(file, destinationPath);
            }
        });
    }
    _updatePackageJson() {
        const filePath = "package.json";
        let packagesData = this.fs.readJSON(this.templatePath(filePath));
        packagesData["dependencies"]["@reduxjs/toolkit"] = "^1.9.1";
        packagesData["dependencies"]["react-redux"] = "^8.0.5";
        this.fs.writeJSON(this.destinationPath(filePath), packagesData);
    }
}
exports.default = ReactBase;
//# sourceMappingURL=index.js.map