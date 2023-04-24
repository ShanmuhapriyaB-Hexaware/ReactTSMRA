import * as Generator from 'yeoman-generator';

class ReactStoreRedux extends Generator {

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args,opts);
    }

    writing() {
        this._copyStoreFiles();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any) {
        this.fs.copyTpl(
          this.templatePath(templatePath),
          this.destinationPath(destinationPath),
          options ?? {}
        )
    }    

    _copyStoreFiles() {
        
    }
}

export default ReactStoreRedux;