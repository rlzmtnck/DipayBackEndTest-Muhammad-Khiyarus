const express = require('express');
const router = express.Router();
function duplicateZeros(arr) {
    const length = arr.length;
    let i = 0;
  
    while (i < length) {
      if (arr[i] === 0) {
        // Geser elemen-elemen ke kanan untuk memberi tempat pada angka nol yang akan diduplikasi
        for (let j = length - 1; j > i; j--) {
          arr[j] = arr[j - 1];
        }
        // Duplikasi angka nol
        i++;
      }
      i++;
    }
  }

router.post('/duplicate-zeroes', (req, res) => {
    const { arr } = req.body;

  if (!arr || !Array.isArray(arr)) {
    const arr = [1, 0, 2, 3, 0, 4, 5, 0];
duplicateZeros(arr);
console.log(arr); 
    return res.status(400).json({ error: 'Input harus berupa array' });
  }
  const n = [1, 0, 2, 3, 0, 4, 5, 0];
duplicateZeros(n);
console.log(n); 
  const hasil = duplicateZeros(arr);
  
  return res.status(200).json({ result: hasil });
  }

);
module.exports = router;