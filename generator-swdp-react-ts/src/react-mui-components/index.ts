import * as Generator from "yeoman-generator";

class ReactMuiComponents extends Generator {
    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts)
    }

    writing() {
        var data = this.options.data;
        var project: string = data.com_name;

        var destination = this.destinationRoot();
        this.log(`destination : ${destination}`);

        this._copyStaticTemplates(project);

        this._editPackagejson(project);
    }

    _copyStaticTemplates(project: string) {
        this.fs.copyTpl(this.templatePath("src"), this.destinationPath("src"));

        this.fs.copyTpl(
            this.templatePath("rollup.config.mjs"),
            this.destinationPath("rollup.config.mjs")
        );

        this.fs.copyTpl(
            this.templatePath("tsconfig.json"),
            this.destinationPath("tsconfig.json")
        );

        this.fs.copyTpl(
            this.templatePath("babel.config.js"),
            this.destinationPath("babel.config.js")
        );

        this.fs.copyTpl(
            this.templatePath("jest.config.js"),
            this.destinationPath("jest.config.js")
        );

        this.fs.copyTpl(
            this.templatePath("assets"),
            this.destinationPath("assets")
        );

        this.fs.copyTpl(
            this.templatePath("custom.d.ts"),
            this.destinationPath("custom.d.ts")
        );
    }

    _editPackagejson(project: string) {
        const packages: any = this.fs.readJSON(this.destinationPath('package.json'));

        var templatePackageData: any = this.fs.readJSON(this.templatePath("package.json"));

        packages.dependencies = { ...packages.dependencies, ...templatePackageData.dependencies };

        packages.peerDependencies = templatePackageData.peerDependencies;

        console.log(packages);

        this.fs.writeJSON(this.destinationPath('package.json'), packages);
    }
};

export default ReactMuiComponents;