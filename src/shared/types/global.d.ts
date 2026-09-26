// Module declarations cho image imports
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg'; 
// Web API có sẵn trong Hermes (React Native >= 0.74)
declare function atob(data: string): string;
declare function btoa(data: string): string;
