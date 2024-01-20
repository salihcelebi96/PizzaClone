// assets.d.ts

declare module '*.png' {
    const value: any;
    export = value;
  }
  
  declare module '*.jpg' {
    const value: any;
    export = value;
  }
  
  // Diğer dosya türleri için de benzer tanımlamalar ekleyebilirsiniz.
  