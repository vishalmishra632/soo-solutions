// @react-three/fiber 9.6.1 still constructs THREE.Clock for its render loop, and three 0.184 marks
// THREE.Clock deprecated in favour of THREE.Timer. That single library-internal notice is the only
// console output the hero scene produces. We filter exactly that message (and nothing else) so the
// console stays clean until R3F ships a Timer-based loop. Remove this once the dependency is updated.
let patched = false;

export function silenceThreeClockDeprecation(): void {
  if (patched || typeof window === "undefined") return;
  patched = true;
  const original = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string" && first.includes("THREE.Clock") && first.includes("deprecated")) {
      return;
    }
    original(...args);
  };
}
