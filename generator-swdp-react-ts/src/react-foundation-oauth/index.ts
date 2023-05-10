import * as Generator from 'yeoman-generator';
import { Project, ImportDeclarationStructure, StructureKind, ObjectLiteralExpression, SyntaxKind, ArrowFunction, ArrayLiteralExpression } from "ts-morph";
import parse from 'node-html-parser';

const JSX_STRING = /\(\s*(<.*)>\s*\)/gs

class ReactStoreRedux extends Generator {

    tsProject: Project;

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
        this.tsProject = new Project()
    }

    authFilesFiles = ['loginComponents']

    writing() {
        this._copyStoreFiles();
        this._updatePackageJson();
        this._updateAppTsx();
        this._updateRoutes();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any) {
        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath),
            options ?? {}
        )
    }

    _copyStoreFiles() {
        this.authFilesFiles.forEach(file => {
            const destinationPath = `./src/configs/auth`
            this._copyTpl(file, destinationPath);
        });
    }

    _updatePackageJson() {
        const filePath: string = "package.json"
        let packagesData: any = this.fs.readJSON(this.destinationPath(filePath))
        packagesData["dependencies"]["@axa-fr/react-oidc"] = "^6.9.2"
        this.fs.writeJSON(this.destinationPath(filePath), packagesData)
    }

    _updateAppTsx() {
        const appTsxFilePath = this.fs.read(this.destinationPath('./src/App.tsx'));
        const appTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath("./src/App.tsx"), appTsxFilePath, { overwrite: true });
        const importDeclarations: ImportDeclarationStructure[] = [
            {
                namedImports: ['configurationIdentityServer'],
                moduleSpecifier: "./configs/auth/Configurations",
                kind: StructureKind.ImportDeclaration
            }
        ]
        appTsxSourceFile.addImportDeclarations(importDeclarations)

        const htmlBody = this._parseJSXFile(appTsxFilePath)
        appTsxSourceFile.getFunction('App')?.setBodyText(`return ${htmlBody}`)
        this.fs.write(this.destinationPath('./src/App.tsx'), appTsxSourceFile.getText())
    }

    _parseJSXFile(appTsxFilePath: any) {
        let matches = JSX_STRING.exec(appTsxFilePath)
        if (matches) {
            let HTML = matches[1] + ">"
            const root = parse(HTML)
            let htmlRootBody = parse('(<OidcProvider configuration={configurationIdentityServer}>' + '\n' + root.toString() + '\n' + '</OidcProvider>)')
            return htmlRootBody.toString();
        }

    }

    _updateRoutes() {
        const routesTsxFilePath = this.fs.read(this.destinationPath('./src/configs/router/routes.config.tsx'));
        const routesTsxSourceFile = this.tsProject.createSourceFile(this.destinationPath("./src/configs/router/routes.config.tsx"), routesTsxFilePath, { overwrite: true });
        const importDeclarations: ImportDeclarationStructure[] = [
            {
                defaultImport: 'MultiAuthProvider',
                moduleSpecifier: "../auth/MultiAuthProvider",
                kind: StructureKind.ImportDeclaration
            }
        ]
        routesTsxSourceFile.addImportDeclarations(importDeclarations)

        // console.log("routes function",routesTsxFilePath)
        const routesFunction = routesTsxSourceFile.getVariableDeclaration('routes')
        const routesArrowFunction = routesFunction?.getDescendantsOfKind(SyntaxKind.ArrowFunction)

        if (!routesArrowFunction) return;

        const routes = routesArrowFunction[0].getDescendantsOfKind(SyntaxKind.Block)[0].getVariableDeclaration('all_routes')?.getFirstChildByKindOrThrow(SyntaxKind.ArrayLiteralExpression)
        
        if (!routes) return;

        routes?.addElement(`{ path: "/login", element: <MultiAuthProvider /> },`)
        this.fs.write(this.destinationPath('./src/configs/router/routes.config.tsx'), routesTsxSourceFile.getText())
    }
}

export default ReactStoreRedux;