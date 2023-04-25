import * as Generator from 'yeoman-generator';
import { FoundationInput, Variations } from './types';

class ReactFoundation extends Generator {

    _mraInput: FoundationInput;
    _variationsChosen: Variations[];
    Variations: Variations[] = [
        {
            category: "store",
            choices: ["react-store-redux"],
            multiple: false
        },
        {
            category: "http",
            choices: ["react-http-axios"],
            multiple: false
        }
    ];

    constructor(args: string | string[], opts: Generator.GeneratorOptions) {
        super(args, opts);
    }

    initializing() {
        this._mraInput = this.options.data;
        this._variationsChosen = this._mraInput.variations
    }

    writing() {
        this._generateReactMRA()
    }

    _generateReactMRA() {
        const baseCodeTemplateInput = { data: this._mraInput }
        this.composeWith(require.resolve('../react-base-code'), baseCodeTemplateInput);

        this._variationsChosen.forEach(variation => {

            const variationDetails = this.Variations.find(v => v.category === variation.category);

            if (!variationDetails) return

            const templateInput = {
                data: {
                    component_name: this._mraInput.component_name,
                    choices: variation.choices
                }
            }

            let currentChoices: string[] = [];

            if (variationDetails.multiple)
                currentChoices = variation.choices
            else
                currentChoices = [variation.choices[0]];

            this._callSubGeneratorsOfVariations(currentChoices, templateInput);
        });
    }

    _callSubGeneratorsOfVariations(choices: string[], templateInput: any) {
        choices.forEach(choice => {
            this.composeWith(require.resolve(`../${choice}`), templateInput);
        })
    }
}

export default ReactFoundation;