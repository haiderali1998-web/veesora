document.addEventListener('DOMContentLoaded', function(){
  // Simple testimonial rotation
  const slides = document.querySelectorAll('#testimonial-slider .slide');
  if(slides.length>1){
    let idx=0;
    setInterval(()=>{
      slides[idx].style.display='none';
      idx=(idx+1)%slides.length;
      slides[idx].style.display='block';
    },4000);
  }
  // Ensure only first slide visible initially
  if(slides.length) slides.forEach((s,i)=>s.style.display=i===0? 'block':'none');
  // Update year in footer if present
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form handling: attempt fetch POST to configured endpoint, otherwise fallback to mailto
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const statusEl = document.getElementById('form-status');
      const endpoint = form.getAttribute('data-form-endpoint') || '';
      const formData = new FormData(form);
      if(endpoint && endpoint !== 'REPLACE_WITH_FORM_ENDPOINT'){
        // POST as JSON to endpoint
        const payload = {};
        formData.forEach((v,k)=>payload[k]=v);
        try{
          statusEl.textContent = 'Sending…';
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(payload)
          });
          if(res.ok){
            statusEl.textContent = 'Message sent — thank you!';
            form.reset();
          } else {
            const text = await res.text();
            statusEl.textContent = 'Server error. Opening email client as fallback.';
            openMailtoFallback(formData);
          }
        }catch(err){
          statusEl.textContent = 'Unable to send. Opening email client.';
          openMailtoFallback(formData);
        }
      } else {
        // mailto fallback
        openMailtoFallback(formData);
      }
    });
  }

  function openMailtoFallback(formData){
    const name = encodeURIComponent(formData.get('name') || '');
    const email = encodeURIComponent(formData.get('email') || '');
    const message = encodeURIComponent(formData.get('message') || '');
    const to = 'hello@veesora.com';
    const subject = encodeURIComponent('Website contact from ' + (name || email));
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  }
});
