import * as Generator from 'yeoman-generator';
import { FoundationInput, Variations } from './types';

class ReactFoundation extends Generator {

    _mraInput: FoundationInput;
    _variationsChosen: Variations[];
    Variations: Variations[] = [
        {
            category: "store",
            choice: ["react-store-redux"],
            multiple: false
        },
        {
            category: "http",
            choice: ["react-http-axios"],
            multiple: false
        }
    ];

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
    }

    initializing() {
        this._mraInput = this.options.data;
        this._variationsChosen = this._mraInput.variationsChosen
    }

    writing() {
        this._generateReactMRA()
    }

    _generateReactMRA() {
        const baseCodeTemplateInput = { data: this._mraInput }
        this.composeWith(require.resolve('../react-base-code'), baseCodeTemplateInput);

        // this.Variations.forEach(variation => {
        //     if (variation.category === "store" && this.Variations.includes(variation.choice[0])) {
        //         this.composeWith(variation.choice)
        //     }
        // });
    }
}

export default ReactFoundation;