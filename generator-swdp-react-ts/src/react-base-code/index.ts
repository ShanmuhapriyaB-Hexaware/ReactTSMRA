import * as Generator from 'yeoman-generator';
import { FoundationInput } from './types';

class ReactBase extends Generator {

    _mraInput: FoundationInput;

    rootFiles = ['public', 'src', '.gitignore', 'index.html', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts']
    editableFiles = ['package.json']

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args,opts);
    }

    initializing() {
        this._mraInput = this.options.data;
    }

    writing() {
        this._copyRootFiles();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any) {
        this.fs.copyTpl(
          this.templatePath(templatePath),
          this.destinationPath(destinationPath),
          options ?? {}
        )
    }    

    _copyRootFiles() {
        const allRootFiles = [...this.rootFiles, ...this.editableFiles]
        const templateInput = { project : this._mraInput }
        
        allRootFiles.forEach(file => {
            const destinationPath = `./${file}`

            if (this.editableFiles.includes(file)) {
                this._copyTpl(file, destinationPath, templateInput);
            }
            else {
                this._copyTpl(file, destinationPath);
            }
            
        });

    }
}

export default ReactBase;