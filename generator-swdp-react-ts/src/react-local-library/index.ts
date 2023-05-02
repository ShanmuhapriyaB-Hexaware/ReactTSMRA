import * as Generator from "yeoman-generator";

class ComponentLibrary extends Generator{

    constructor(args: string | string[], opts: Generator.GeneratorOptions){
        super(args, opts);
    }

    writing() {
        var data: {
            com_name: string,
            author: string,
            description: string
        } = this.options.data;
        var project: string = data.com_name;
        var destination: string = this.destinationRoot()

        this._copyLocallyPublishedLibrary(project);

        this._editPackagejson(project);
    }

    _copyLocallyPublishedLibrary(project: string){
        
        this.fs.copyTpl(this.templatePath("local-component-library"),this.destinationPath("local-component-library"))

    }

    _editPackagejson(project: string) {
        const filePath = this.destinationPath('package.json');
        const packages = this.fs.readJSON(filePath) as any;
        const deps = {
            "mui-component-library": "file:local-component-library/mui-components/react-rapidx-mui-component-library-0.6.4.tgz"
        }
        packages.dependencies = {...packages.dependencies, ...deps}
        console.log(packages.dependencies)
        this.fs.writeJSON(filePath, packages);
    }
}

export default ComponentLibrary;