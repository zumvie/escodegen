class C1 { aaa; }
class C2 { \u0041; }
class C3 { '0'; }
class C4 { 100; }
class C5 { [0]; }
class C6 { aaa = bbb; }
class C7 { aaa = () => 0; }
class C8 { static aaa; }
class C9 { static aaa = bbb; }
class C10 { static aaa = 1; bbb = 2; }
class C11 { get; set; static; async }

class C12 { #aaa; #bbb = this.#aaa; }
class C13 { #\u0041; }
class C14 { #𩸽; }

class C15 { static aaa; static { C15.aaa = 1; } }
class C16 { static { C15.aaa = 1; } static { C15.bbb = 2; } }