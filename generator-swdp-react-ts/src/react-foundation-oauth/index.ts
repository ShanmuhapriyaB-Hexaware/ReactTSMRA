import * as Generator from 'yeoman-generator';
import { Project, ImportDeclarationStructure, StructureKind } from "ts-morph";
import parse from 'node-html-parser';

const JSX_STRING = /\(\s*(<.*)>\s*\)/gs

class ReactStoreRedux extends Generator {

    tsProject: Project;

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
        this.tsProject = new Project()
    }

    rootStoreFiles = ['store']
    componentStoreFiles = ['home']

    writing() {
        this._copyStoreFiles();
        this._updatePackageJson();
        // this._updateAppTsx();
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

    // _updateAppTsx() {
    //     const appTsxFilePath = this.fs.read(this.destinationPath('./src/App.tsx'));
    //     const appTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath("./src/App.tsx"), appTsxFilePath, { overwrite: true });
    //     const importDeclarations: ImportDeclarationStructure[] = [
    //         {
    //             namedImports: ['Provider as ReduxProvider'],
    //             moduleSpecifier: "react-redux",
    //             kind: StructureKind.ImportDeclaration
    //         },
    //         {
    //             defaultImport: 'store',
    //             moduleSpecifier: "./store",
    //             kind: StructureKind.ImportDeclaration
    //         }
    //     ]
    //     appTsxSourceFile.addImportDeclarations(importDeclarations)

    //     const htmlBody = this._parseJSXFile(appTsxFilePath)
    //     appTsxSourceFile.getFunction('App')?.setBodyText(`return ${htmlBody}`)
    //     this.fs.write(this.destinationPath('./src/App.tsx'), appTsxSourceFile.getText())
    // }

    _parseJSXFile(appTsxFilePath: any) {
        let matches = JSX_STRING.exec(appTsxFilePath)
        if (matches) {
            let HTML = matches[1] + ">"
            const root = parse(HTML)
            let htmlRootBody = parse(`(<ReduxProvider store={store}>${root.toString()}</ReduxProvider>)`)
            // console.log("parsed HTML Body", htmlRootBody.toString())
            return htmlRootBody.toString();
        }

    }
}

export default ReactStoreRedux;