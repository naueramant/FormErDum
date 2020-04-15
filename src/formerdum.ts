export default class FormErDum {
  private tape: Array<number>;
  private ptr: number;
  private isLooping: boolean;
  private loopStack: number[];
  private innerLoops: number;

  constructor() {
    this.reset();
  }

  public interpret(program: string) {
    const input: string[] = program.split(/(?=\FORM)/).map(d => { 
      if (d != null) {
        return d.replace(/\s+$/, '');
      }
    });

    const output: string[] = [];

    for (let i = 0; i < input.length; i++) {
      const opr = input[i];

      if (this.isLooping) {
        if (opr === "FORM ER DUM DUM DUM DUM DUM DUM DUM") this.innerLoops++;
        if (opr === "FORM ER DUM DUM DUM DUM DUM DUM DUM DUM") {
          if (this.innerLoops === 0) this.isLooping = false;
          else this.innerLoops--;
        }
        continue;
      }

      switch (opr) {
        case "FORM ER DUM":
          this.ptr++;
          this.tape[this.ptr] = this.tape[this.ptr] || 0;
          break;
        case "FORM ER DUM DUM":
          this.ptr--;
          this.tape[this.ptr] = this.tape[this.ptr] || 0;
          break;
        case "FORM ER DUM DUM DUM":
          this.tape[this.ptr]++;
          break;
        case "FORM ER DUM DUM DUM DUM":
          this.tape[this.ptr]--;
          break;
        case "FORM ER DUM DUM DUM DUM DUM":
          output.push(String.fromCharCode(this.tape[this.ptr]));
          break;
        case "FORM ER DUM DUM DUM DUM DUM DUM":
          this.tape[this.ptr] = prompt()[0].charCodeAt(0);
          break;
        case "FORM ER DUM DUM DUM DUM DUM DUM DUM":
          this.tape[this.ptr] === 0
            ? (this.isLooping = true)
            : this.loopStack.push(i);
          break;
        case "FORM ER DUM DUM DUM DUM DUM DUM DUM DUM":
          this.tape[this.ptr] !== 0
            ? (i = this.loopStack[this.loopStack.length - 1])
            : this.loopStack.pop();
          break;
        default:
          break;
      }
    }

    return output.join("");
  }

  public reset() {
    this.tape = Array(30000).fill(0);
    this.ptr = 0;
    this.isLooping = false;
    this.loopStack = [];
    this.innerLoops = 0;
  }
}