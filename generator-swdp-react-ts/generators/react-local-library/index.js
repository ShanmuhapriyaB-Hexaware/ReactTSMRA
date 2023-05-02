"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class ComponentLibrary extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    writing() {
        var data = this.options.data;
        var project = data.com_name;
        var destination = this.destinationRoot();
        this._copyLocallyPublishedLibrary(project);
        this._editPackagejson(project);
    }
    _copyLocallyPublishedLibrary(project) {
        this.fs.copyTpl(this.templatePath("local-component-library"), this.destinationPath("local-component-library"));
    }
    _editPackagejson(project) {
        const filePath = this.destinationPath('package.json');
        const packages = this.fs.readJSON(filePath);
        const deps = {
            "mui-component-library": "file:local-component-library/mui-components/react-rapidx-mui-component-library-0.6.4.tgz"
        };
        packages.dependencies = { ...packages.dependencies, ...deps };
        console.log(packages.dependencies);
        this.fs.writeJSON(filePath, packages);
    }
}
exports.default = ComponentLibrary;
//# sourceMappingURL=index.js.map