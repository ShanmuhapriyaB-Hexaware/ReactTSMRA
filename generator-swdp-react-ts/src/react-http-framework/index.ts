import * as Generator from 'yeoman-generator';

class HttpRequestFramework extends Generator {

    requestFile = ['axios.ts']

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
    }

    writing() {
        this._copyHttpRequestFile();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any){
        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath),
            options ?? {}
        )
    }

    _copyHttpRequestFile() {
        const allRequestFile = [...this.requestFile]
        
        allRequestFile.forEach(file => {
            const destinationPath = `./src/libs/${file}`

            this._copyTpl(file,destinationPath);
        })
    }
}

export default HttpRequestFramework;