import * as Generator from 'yeoman-generator';
import parse from 'node-html-parser';
import { ArrowFunction, ImportDeclarationStructure, ObjectLiteralExpression, Project, StructureKind, SyntaxKind } from 'ts-morph';

const JSX_STRING = /\(\s*(<.*)>\s*\)/gs

class MUIFramework extends Generator {

    tsProject: Project;

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
        this.tsProject = new Project()
    }

    muiFiles = ['components']

    writing() {
        this._copyMUIFiles();
        this._updateRoutesConfig();
    }

    _copyTpl(templatePath: string, destinationPath: string, options?: any) {
        this.fs.copyTpl(
            this.templatePath(templatePath),
            this.destinationPath(destinationPath),
            options ?? {}
        )
    }

    _copyMUIFiles() {
        const allMUIFiles = [...this.muiFiles]

        allMUIFiles.forEach(file => {
            const destinationPath = ``
            this._copyTpl(file, destinationPath);
        });
    }

    _updateRoutesConfig() {
        const routesConfigFilePath = this.fs.read(this.destinationPath('./src/configs/router/routes.config.tsx'));
        const routesSourceFile = this.tsProject.createSourceFile(this.destinationPath('./src/configs/router/routes.config.tsx'), routesConfigFilePath, { overwrite: true });
        const importDeclarations: ImportDeclarationStructure[] = [
            {
                namedImports: ['Layout'],
                moduleSpecifier: "../../common/components/layout/layout",
                kind: StructureKind.ImportDeclaration
            }
        ]

        routesSourceFile.addImportDeclarations(importDeclarations)

        const routesFunction = routesSourceFile.getVariableDeclaration('routes');
        // const routesArray = routesFunction?.getVariableDeclaration('all_routes');
        const routesArrayFunction = routesFunction?.getDescendantsOfKind(SyntaxKind.ArrowFunction);

        // console.log("ArrowFunction", routesArrayFunction);
        if (!routesArrayFunction) return;
        const routesObject = routesArrayFunction[0]?.getDescendantsOfKind(SyntaxKind.Block)[0].getVariableDeclaration('all_routes');
        // console.log("routesObject", routesObject);

        const routesArrayObject = routesObject?.getFirstChildByKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        if (!routesArrayObject) return;
        // const existingArrayElements = routesArrayObject.getElements().map((expression) => expression.getText());

        // routesArrayObject.addElements([]);
        routesArrayObject.addElements([
            `
            {
                element: <Layout />,
                children: [...homeRoutes]
            },
            `,
            // ...existingArrayElements
        ]
        );




        // routesArray?.addPropertyAssignment(
        //     {
        //         kind: StructureKind.PropertyAssignment,
        //         initializer: `element: <Layout />,`,
        //         name:  `children: [...homeRoutes]`
        //     }
        // );
        // const routesObject = <ObjectLiteralExpression>routesArray?.getInitializer();

        // routesArray?.insertPropertyAssignment(0,
        //     {
        //         kind: StructureKind.PropertyAssignment,
        //         initializer: '<Layout />',
        //         name: 'element'

        //     })
        //     console.log(routesArray);
        this.fs.write(this.destinationPath('./src/configs/router/routes.config.tsx'), routesSourceFile.getText())
    }

}

export default MUIFramework;