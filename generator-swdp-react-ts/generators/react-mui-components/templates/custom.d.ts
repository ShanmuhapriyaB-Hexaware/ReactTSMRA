declare module '*.svg' {
    import React = require('react');
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default content;
  }