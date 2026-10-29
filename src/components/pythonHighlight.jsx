// Hero terminali uchun oddiy Python sintaksis yoritgichi (REPL ko'rinishi).
// Qator ">>> " yoki "... " bilan boshlansa — kod, aks holda — Python chiqargan natija.
// Ranglar qorong'i terminal fonida (slate-900) WCAG AA kontrastiga mos

const tokenPattern = /(#.*)|("[^"]*"?|'[^']*'?)|\b(import|as|from|def|return|for|in|lambda|print|abs|round)\b|\b(\d+(?:\.\d*)?)|([A-Za-z_]\w*)(?=\()/g;

const tokenClasses = [
  'text-slate-400 italic', // izoh
  'text-lime-300',         // satr
  'text-purple-400',       // kalit so'z va builtin
  'text-amber-300',        // son
  'text-sky-400',          // funksiya chaqiruvi
];

const highlightCode = (code, lineIndex) => {
  const parts = [];
  let last = 0;
  for (const match of code.matchAll(tokenPattern)) {
    if (match.index > last) parts.push(code.slice(last, match.index));
    const group = match.slice(1).findIndex((value) => value !== undefined);
    parts.push(
      <span key={`${lineIndex}-${match.index}`} className={tokenClasses[group]}>
        {match[0]}
      </span>
    );
    last = match.index + match[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
};

export const highlightPython = (text) =>
  text.split('\n').map((line, index, lines) => {
    const isCode = line.startsWith('>>>') || line.startsWith('...');
    const newline = index < lines.length - 1 ? '\n' : '';
    if (!isCode) {
      return (
        <span key={index} className="text-green-400">
          {line}
          {newline}
        </span>
      );
    }
    return (
      <span key={index} className="text-slate-100">
        <span className="text-slate-400">{line.slice(0, 3)}</span>
        {highlightCode(line.slice(3), index)}
        {newline}
      </span>
    );
  });
