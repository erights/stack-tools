// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo');
const { stringFrom } = require('./util.js');

const lexer = moo.compile({
  // Don't even try to lex frames here
  Frame: /^[ \t]*at .*$/,
  SP: /[ \t]+/,
  NL: { match: '\n', lineBreaks: true },
  CN: ':',
  Fragment: /[^: \t\n]+/,
});

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "ErrorStack$ebnf$1", "symbols": []},
    {"name": "ErrorStack$ebnf$1$subexpression$1", "symbols": ["NL", "Error"]},
    {"name": "ErrorStack$ebnf$1", "symbols": ["ErrorStack$ebnf$1", "ErrorStack$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ErrorStack", "symbols": ["Error", "ErrorStack$ebnf$1"], "postprocess":  (d) => {
         const first = d[0];
         const rest = d[1] ? d[1].map((d => {
           const error = d[1];
           let { header, frames } = error;
           const colonIdx = header.indexOf(':');
           if (colonIdx >= 0) {
             const prefix = header.slice(0, colonIdx + 1);
             header = header.slice(colonIdx + 1).trimLeft();
             return { header, frames, prefix };
           }
           return error;
         })) : [];
         return [first, ...rest];
        } },
    {"name": "ErrorStack", "symbols": ["Message"], "postprocess": (d) => [({ header: d[0] })]},
    {"name": "Error$ebnf$1", "symbols": ["NL"]},
    {"name": "Error$ebnf$1", "symbols": ["Error$ebnf$1", "NL"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Error", "symbols": ["Message", "Error$ebnf$1", "Stack"], "postprocess": (d) => ({ header: d[0], frames: d[2] })},
    {"name": "Message$ebnf$1", "symbols": []},
    {"name": "Message$ebnf$1$subexpression$1", "symbols": ["NL", "Text"]},
    {"name": "Message$ebnf$1", "symbols": ["Message$ebnf$1", "Message$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Message", "symbols": ["Text", "Message$ebnf$1"], "postprocess": (d) => d[0] + stringFrom(d[1].flat())},
    {"name": "Prefix", "symbols": ["Text", "_", {"literal":":"}, "_"]},
    {"name": "Stack$ebnf$1", "symbols": []},
    {"name": "Stack$ebnf$1$subexpression$1", "symbols": ["NL", "Frame"]},
    {"name": "Stack$ebnf$1", "symbols": ["Stack$ebnf$1", "Stack$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Stack", "symbols": ["Frame", "Stack$ebnf$1"], "postprocess": (d) => [d[0], ...(d[1] ? d[1].map(d => d[1]) : [])]},
    {"name": "Frame", "symbols": [(lexer.has("Frame") ? {type: "Frame"} : Frame)], "postprocess": (d) => d[0].text},
    {"name": "Text$ebnf$1", "symbols": ["Fragment"]},
    {"name": "Text$ebnf$1", "symbols": ["Text$ebnf$1", "Fragment"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Text", "symbols": ["Text$ebnf$1"], "postprocess": (d) => stringFrom(d[0])},
    {"name": "Fragment", "symbols": [(lexer.has("SP") ? {type: "SP"} : SP)]},
    {"name": "Fragment", "symbols": [(lexer.has("CN") ? {type: "CN"} : CN)]},
    {"name": "Fragment", "symbols": [(lexer.has("Fragment") ? {type: "Fragment"} : Fragment)], "postprocess": (d) => d[0].text},
    {"name": "NL", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": (d) => d[0].text},
    {"name": "_$ebnf$1", "symbols": ["__"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": id},
    {"name": "__", "symbols": [(lexer.has("SP") ? {type: "SP"} : SP)], "postprocess": (d) => d[0].text}
]
  , ParserStart: "ErrorStack"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
