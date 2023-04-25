import * as Generator from 'yeoman-generator';

class ReactStoreRedux extends Generator {

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
    }

    rootStoreFiles = ['store']
    componentStoreFiles = ['home']

    writing() {
        this._copyStoreFiles();
        this._updatePackageJson();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any) {
        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath),
            options ?? {}
        )
    }

    _copyStoreFiles() {
        this.rootStoreFiles.forEach(file => {
            const destinationPath = `./src/${file}`
            this._copyTpl(file, destinationPath);
        });

        this.componentStoreFiles.forEach(file => {
            const templatePath = `${file}Store`
            const destinationPath = `./src/main/${file}/store`
            this._copyTpl(templatePath, destinationPath);
        });
 
    }

    _updatePackageJson() {
        const filePath: string = "package.json"
        let packagesData: any = this.fs.readJSON(this.destinationPath(filePath))
        packagesData["dependencies"]["@reduxjs/toolkit"] = "^1.9.1"
        packagesData["dependencies"]["react-redux"] = "^8.0.5"
        this.fs.writeJSON(this.destinationPath(filePath), packagesData)
    }
}

export default ReactStoreRedux;