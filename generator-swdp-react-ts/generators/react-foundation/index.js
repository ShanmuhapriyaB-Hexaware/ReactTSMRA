"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
class ReactFoundation extends Generator {
    _mraInput;
    _variationsChosen;
    Variations = [
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
    constructor(args, opts) {
        super(args, opts);
    }
    initializing() {
        this._mraInput = this.options.data;
        this._variationsChosen = this._mraInput.variationsChosen;
    }
    writing() {
        this._generateReactMRA();
    }
    _generateReactMRA() {
        const baseCodeTemplateInput = { data: this._mraInput };
        this.composeWith(require.resolve('../react-base-code'), baseCodeTemplateInput);
        // this.Variations.forEach(variation => {
        //     if (variation.category === "store" && this.Variations.includes(variation.choice[0])) {
        //         this.composeWith(variation.choice)
        //     }
        // });
    }
}
exports.default = ReactFoundation;
//# sourceMappingURL=index.js.map