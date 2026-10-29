// Hero terminalida Python (NumPy) REPL da yechiladigan oliy matematika masalalari.
// code — harfma-harf yoziladi, output — Python natijasi kabi birdaniga chiqadi
// (natijalar NumPy 2.x da haqiqatan hisoblangan).
// stage — shu qadam boshlanganda 3D sahnada (mathScene.js) yoqiladigan bosqich.
//
// 1-masala: chiziqli tenglamalar sistemasi (Gauss usuli) — uch tekislik P(1, 2, 3) nuqtada kesishadi.
// 2-masala: determinant geometriyasi — A matritsa birlik kubni hajmi |det A| = 5 bo'lgan parallelepipedga o'tkazadi
export const solverScript = [
  {
    problem: 'system',
    steps: [
      { stage: 0, code: '>>> import numpy as np' },
      { stage: 0, code: '>>> # solve Ax = b — Gaussian elimination' },
      { stage: 1, code: '>>> A = np.array([[1,  1,  1],' },
      { stage: 2, code: '...               [2, -1,  1],' },
      { stage: 3, code: '...               [1,  2, -1]])' },
      { stage: 3, code: '>>> b = np.array([6, 3, 2])' },
      { stage: 3, code: '>>> M = np.c_[A, b].astype(float)' },
      { stage: 4, code: '>>> M[1] -= 2 * M[0]      # R2 - 2·R1' },
      { stage: 5, code: '>>> M[2] -= M[0]          # R3 - R1' },
      { stage: 6, code: '>>> M[2] = 3 * M[2] + M[1]' },
      { stage: 6, code: '>>> M[2]' },
      { stage: 6, output: 'array([  0.,   0.,  -7., -21.])' },
      { stage: 6, code: '>>> np.linalg.solve(A, b)' },
      { stage: 7, output: 'array([1., 2., 3.])' },
      { stage: 8, code: '>>> # planes meet at P(1, 2, 3)' },
    ],
  },
  {
    problem: 'det',
    steps: [
      { stage: 0, code: '>>> # det A — volume scale factor' },
      { stage: 0, code: '>>> e = np.eye(3)          # unit cube' },
      { stage: 1, code: '>>> A = np.array([[2, 1, 0],' },
      { stage: 1, code: '...               [0, 1, 1],' },
      { stage: 1, code: '...               [1, 0, 2]])' },
      { stage: 2, code: '>>> A @ e          # e₁ e₂ e₃ → columns' },
      { stage: 3, output: 'array([[2., 1., 0.],\n       [0., 1., 1.],\n       [1., 0., 2.]])' },
      { stage: 3, code: '>>> np.linalg.det(A)' },
      { stage: 4, output: 'np.float64(5.000000000000001)' },
      { stage: 4, code: '>>> V = round(abs(np.linalg.det(A)), 6)' },
      { stage: 4, code: '>>> print(f"V = |det A| = {V:g}")' },
      { stage: 5, output: 'V = |det A| = 5' },
    ],
  },
];
