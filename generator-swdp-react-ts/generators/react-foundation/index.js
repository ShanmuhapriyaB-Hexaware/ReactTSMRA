"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class ReactFoundation extends Generator {
    _mraInput;
    _variationsChosen;
    _subGenPrefix = "react-foundation";
    Variations = [
        {
            category: "auth",
            choices: ["oauth"],
            multiple: false
        },
        {
            category: "store",
            choices: ["redux"],
            multiple: false
        },
        {
            category: "http",
            choices: ["http-framework"],
            multiple: false
        },
        {
            category: "components",
            choices: ["mui-framework"],
            multiple: false
        },
        {
            category: "component-library",
            choices: ["react-mui-local-library"],
            multiple: false
        }
    ];
    constructor(args, opts) {
        super(args, opts);
    }
    initializing() {
        this._mraInput = this.options.data;
        this._variationsChosen = this._mraInput.variations;
    }
    writing() {
        this._generateReactMRA();
    }
    _generateReactMRA() {
        const baseCodeTemplateInput = { data: this._mraInput };
        this.composeWith(require.resolve(`../${this._subGenPrefix}-code`), baseCodeTemplateInput);
        this._variationsChosen.forEach(variation => {
            const variationDetails = this.Variations.find(v => v.category === variation.category);
            if (!variationDetails)
                return;
            const templateInput = {
                data: {
                    component_name: this._mraInput.component_name,
                    choices: variation.choices
                }
            };
            let currentChoices = [];
            if (variationDetails.multiple)
                currentChoices = variation.choices;
            else
                currentChoices = [variation.choices[0]];
            this._callSubGeneratorsOfVariations(currentChoices, templateInput);
        });
    }
    _callSubGeneratorsOfVariations(choices, templateInput) {
        choices.forEach(choice => {
            this.composeWith(require.resolve(`../${this._subGenPrefix}-${choice}`), templateInput);
        });
    }
}
exports.default = ReactFoundation;
//# sourceMappingURL=index.js.map