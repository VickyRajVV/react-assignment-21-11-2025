import React from 'react'


export default function Pagination({ currentPage, totalPages, onPageChange }){
const createRange = () => {
const range = []
for(let i=1;i<=totalPages;i++) range.push(i)
return range
}


return (
<div className="pagination">
<button className="button" onClick={() => onPageChange(Math.max(1, currentPage-1))} disabled={currentPage===1}>Prev</button>
{createRange().map(p => (
<button
key={p}
className="button"
style={{ fontWeight: p===currentPage ? '700' : '400' }}
onClick={() => onPageChange(p)}
>{p}</button>
))}
<button className="button" onClick={() => onPageChange(Math.min(totalPages, currentPage+1))} disabled={currentPage===totalPages}>Next</button>
</div>
)
}