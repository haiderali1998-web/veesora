document.addEventListener('DOMContentLoaded', function(){
  // copy-to-clipboard for each button
  document.querySelectorAll('.btn-copy').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const ta = btn.closest('.prompt-card').querySelector('textarea');
      if(!ta) return;
      ta.select();
      try{
        document.execCommand('copy');
        showToast('Prompt copied to clipboard');
      }catch(e){
        // fallback
        navigator.clipboard.writeText(ta.value).then(()=>showToast('Prompt copied to clipboard'));
      }
    });
  });

  // simple search
  const search = document.getElementById('prompt-search');
  if(search){
    search.addEventListener('input', ()=>{
      const q = search.value.toLowerCase();
      document.querySelectorAll('.prompt-card').forEach(card=>{
        const text = (card.innerText||'').toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  function showToast(msg){
    const t = document.getElementById('toast');
    if(!t) return;
    t.textContent = msg;
    t.style.opacity = 1;
    setTimeout(()=>{ t.style.opacity = 0; }, 2000);
  }
});