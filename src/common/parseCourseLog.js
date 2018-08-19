class Eat {
  constructor(str, isReversed = false) {
    this.isReversed = isReversed;
    this.str = isReversed ? this.reverse(str) : str;
    this.lastIndex = 0;
  }

  reverse(s) {
    return s
      .split('')
      .reverse()
      .join('');
  }

  eat(r) {
    const regex = new RegExp(r, 'g');
    regex.lastIndex = this.lastIndex;
    const m = regex.exec(this.str);
    if (!m) throw new SyntaxError();
    this.lastIndex = m.index + m[0].length;
    return this.isReversed ? this.reverse(m[0]) : m[0];
  }
}

export const parseCourseLog = input => {
  try {
    return input
      .split('------')
      .slice(0, -1)
      .map(course => {
        let semester,
          no,
          name,
          credit,
          grade,
          e = new Eat(course);
        semester = e.eat(/\d{2,3}/) + e.eat(/[1-3]0/);
        no = e.eat(/[A-Z]{1,4}/).padEnd(4, ' ') + e.eat(/\d{6}/);
        name = e.eat(/(.+?)(?=-- |Syllabus)/).trim();

        e = new Eat(e.str, true);
        e.eat(/(noitubirtsiD edarG eht tciderP|----)/);
        grade = e.eat(/([+-]?[A-EX]|到未績成|退二)/);
        credit = e.eat(/\d/);
        // console.log(year, semester, no, name, credit, grade);
        return {
          semester,
          no,
          name,
          credit,
          grade,
        };
      });
  } catch (error) {
    // console.log('ERROR');
    return [];
  }
};

// function test() {
//   var fs = require('fs');
//   inputs = fs.readFileSync('error_sample.txt').toString();
//   parseCourseLog(inputs);
// }
// test();
