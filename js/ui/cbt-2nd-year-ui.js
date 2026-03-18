/* UI module for 2nd Year CBT Prep Plan */

function showCbt2ndYearPlan() {
  // Hide home screen or other open screens
  document.getElementById('homeScreen').style.display = 'none';
  if (document.getElementById('interviewPrepPage')) document.getElementById('interviewPrepPage').style.display = 'none';
  if (document.getElementById('levelPage')) document.getElementById('levelPage').style.display = 'none';
  
  // Show our page
  const page = document.getElementById('cbt2ndYearPage');
  page.style.display = 'block';
  
  // Render content
  renderCbtPlan();
  
  // Update breadcrumb
  const bc = document.getElementById('breadcrumb');
  if (bc) {
    bc.innerHTML = `
      <span class="bc-item" onclick="goHome()">HOME</span>
      <span class="bc-arrow">/</span>
      <span class="bc-item active">2ND YEAR CBT PREP</span>
    `;
  }
}

function hideCbt2ndYearPlan() {
  document.getElementById('cbt2ndYearPage').style.display = 'none';
  if (typeof goHome === 'function') {
    goHome();
  }
}

function renderCbtPlan() {
  const container = document.getElementById('cbt2ndYearContent');
  if (!container) return;
  
  if (!CBT_2ND_YEAR_PLAN) {
    container.innerHTML = '<div class="error-card">Data not found!</div>';
    return;
  }
  
  const plan = CBT_2ND_YEAR_PLAN;
  
  // ── Hero Banner ──
  let html = `
    <div style="background:linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(15,23,42,0) 100%); padding:2rem; border-radius:12px; border:1px solid rgba(14,165,233,0.2); margin-bottom:2rem;">
      <h1 style="color:#e0f2fe;font-size:1.8rem;margin:0 0 0.75rem 0;font-family:'Syne',sans-serif;">${plan.title}</h1>
      <p style="color:#94a3b8;font-size:0.95rem;max-width:900px;line-height:1.7;">${plan.purpose}</p>
      
      <div style="display:flex;gap:1rem;margin-top:1.25rem;flex-wrap:wrap;">
        <div style="background:rgba(15,23,42,0.6);padding:1rem 1.25rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05);flex:1;min-width:180px;">
          <div style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.4rem;">Daily Target</div>
          <div style="font-size:1.5rem;color:#38bdf8;font-weight:700;">${plan.dailyTarget.total} <span style="font-size:0.9rem;font-weight:400;color:#94a3b8;">MCQs / day</span></div>
        </div>
        <div style="background:rgba(15,23,42,0.6);padding:1rem 1.25rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05);flex:1;min-width:180px;">
          <div style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.4rem;">Duration</div>
          <div style="font-size:1.5rem;color:#fbbf24;font-weight:700;">${plan.examPattern.duration}</div>
        </div>
        <div style="background:rgba(15,23,42,0.6);padding:1rem 1.25rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05);flex:1;min-width:180px;">
          <div style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:0.4rem;">Pass %</div>
          <div style="font-size:1.5rem;color:#34d399;font-weight:700;">${plan.examPattern.passPercentage}</div>
        </div>
      </div>
    </div>
  `;

  // ── Companies List ──
  html += `
    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1.25rem;margin-bottom:2rem;">
      <h3 style="color:#e0f2fe;font-size:1rem;margin:0 0 0.75rem 0;font-family:'Syne',sans-serif;">🏢 Companies that test in 2nd Year</h3>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        ${plan.companies.map(c => `<span style="background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.2);color:#7dd3fc;padding:4px 12px;border-radius:4px;font-size:0.85rem;">${c}</span>`).join('')}
      </div>
    </div>
  `;

  // ── Exam Pattern Section Table ──
  html += `
    <h2 style="font-family:'Syne',sans-serif;color:#f8fafc;margin-bottom:1rem;font-size:1.3rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="color:#38bdf8;">01.</span> Exam Pattern — NYK 2nd Year CBT
    </h2>
    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;margin-bottom:2.5rem;overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px;">
        <thead style="background:rgba(0,0,0,0.2);color:#94a3b8;font-size:0.8rem;text-align:left;">
          <tr>
            <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Section</th>
            <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Questions</th>
            <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Time</th>
            <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Difficulty</th>
          </tr>
        </thead>
        <tbody style="font-size:0.9rem;color:#cbd5e1;">
          ${plan.examPattern.sections.map(s => `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
              <td style="padding:0.75rem 1.25rem;font-weight:600;color:#e0f2fe;">${s.section}</td>
              <td style="padding:0.75rem 1.25rem;">${s.questions}</td>
              <td style="padding:0.75rem 1.25rem;">${s.time}</td>
              <td style="padding:0.75rem 1.25rem;">${s.difficulty}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="padding:0.75rem 1.25rem;font-size:0.85rem;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.05);">
        Negative Marking: <strong style="color:#34d399;">${plan.examPattern.negativeMarking}</strong> · Total Questions: <strong>${plan.examPattern.questions}</strong>
      </div>
    </div>
  `;

  // ── Source Allocation ──
  html += `
    <h2 style="font-family:'Syne',sans-serif;color:#f8fafc;margin-bottom:1rem;font-size:1.3rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="color:#38bdf8;">02.</span> Source Allocation Per Day (1,200 MCQs)
    </h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:0.75rem;margin-bottom:2.5rem;">
      ${plan.dailyTarget.sources.map(s => `
        <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1rem;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="color:#e0f2fe;font-size:0.9rem;font-weight:500;">${s.source}</div>
            <div style="color:#94a3b8;font-size:0.75rem;margin-top:2px;">${s.focus}</div>
          </div>
          <div style="color:#38bdf8;font-weight:700;font-size:1.1rem;font-family:'JetBrains Mono',monospace;">${s.count}</div>
        </div>
      `).join('')}
    </div>
  `;

  // ── Subject Syllabus with Full Subtopics ──
  html += `
    <h2 style="font-family:'Syne',sans-serif;color:#f8fafc;margin-bottom:1rem;font-size:1.3rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="color:#38bdf8;">03.</span> Subject-Wise Detailed Topic List
    </h2>
  `;
  
  plan.subjects.forEach((sub, idx) => {
    html += `
      <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;margin-bottom:1.5rem;overflow:hidden;">
        <div style="background:rgba(56,189,248,0.08);padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;">
          <h3 style="color:#e0f2fe;font-size:1.1rem;margin:0;font-family:'Syne',sans-serif;">B.3.${idx+1} ${sub.title}</h3>
          <div style="display:flex;gap:0.75rem;font-size:0.8rem;color:#94a3b8;">
            <span>Exam: <strong style="color:#38bdf8;">${sub.count}</strong> Qs</span>
            <span>Daily: <strong style="color:#fbbf24;">${sub.dailyMCQs}</strong> MCQs</span>
            <span>Difficulty: <strong>${sub.difficulty || ''}</strong></span>
          </div>
        </div>
        ${sub.note ? `<div style="padding:0.75rem 1.25rem;font-size:0.85rem;color:#94a3b8;background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.05);font-style:italic;">${sub.note}</div>` : ''}
        <div style="padding:1rem 1.25rem;">
    `;

    if (sub.categories) {
      sub.categories.forEach(cat => {
        html += `
          <div style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <span style="color:#7dd3fc;font-weight:600;font-size:0.95rem;text-transform:uppercase;letter-spacing:0.5px;">${cat.name}</span>
              <span style="color:#94a3b8;font-size:0.8rem;font-family:'JetBrains Mono',monospace;">${cat.daily} MCQs/day</span>
            </div>
        `;
        if (cat.subtopics) {
          cat.subtopics.forEach(st => {
            html += `
              <div style="display:flex;padding:0.5rem 0;border-bottom:1px solid rgba(255,255,255,0.03);margin-left:0.75rem;">
                <div style="min-width:24px;color:#38bdf8;font-size:0.85rem;">•</div>
                <div style="flex:1;">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;">
                    <span style="color:#e2e8f0;font-size:0.9rem;">${st.topic}</span>
                    <span style="color:#fbbf24;font-size:0.75rem;font-family:'JetBrains Mono',monospace;white-space:nowrap;margin-left:8px;">daily ${st.daily}</span>
                  </div>
                  ${st.detail ? `<div style="color:#94a3b8;font-size:0.8rem;margin-top:2px;line-height:1.5;">${st.detail}</div>` : ''}
                </div>
              </div>
            `;
          });
        }
        html += `</div>`;
      });
    }
    html += `</div></div>`;
  });

  // ── Daily Schedule ──
  html += `
    <h2 style="font-family:'Syne',sans-serif;color:#f8fafc;margin-bottom:1rem;font-size:1.3rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="color:#38bdf8;">04.</span> Daily Drilling Schedule
    </h2>
    <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;margin-bottom:2.5rem;">
  `;
  
  plan.dailySchedule.forEach(item => {
    if (item.isHeader) {
      html += `
        <div style="background:rgba(56,189,248,0.1);color:#38bdf8;padding:0.75rem 1.25rem;font-weight:600;font-size:0.9rem;letter-spacing:1px;display:flex;justify-content:space-between;border-top:1px solid rgba(56,189,248,0.2);border-bottom:1px solid rgba(56,189,248,0.2);">
          <span>${item.time}</span>
          <span>${item.task}</span>
        </div>
      `;
    } else {
      let actionBtn = '';
      if (item.action) {
        actionBtn = `<button style="background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.3);color:#38bdf8;padding:4px 12px;border-radius:4px;font-size:0.75rem;cursor:pointer;font-family:'JetBrains Mono',monospace;transition:all 0.2s;" onmouseover="this.style.background='rgba(56,189,248,0.2)'" onmouseout="this.style.background='rgba(56,189,248,0.1)'" onclick="startCbtTest('${item.action}')">START TEST ⏵</button>`;
      }
      
      html += `
        <div style="display:flex;padding:0.85rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);align-items:center;">
          <div style="width:140px;color:#94a3b8;font-family:'JetBrains Mono',monospace;font-size:0.85rem;">${item.time}</div>
          <div style="flex:1;color:#e2e8f0;font-size:0.95rem;">${item.task}</div>
          <div>${actionBtn}</div>
        </div>
      `;
    }
  });
  html += `</div>`;

  // ── Weekly Plan ──
  html += `
    <h2 style="font-family:'Syne',sans-serif;color:#f8fafc;margin-bottom:1rem;font-size:1.3rem;display:flex;align-items:center;gap:0.5rem;">
      <span style="color:#38bdf8;">05.</span> 4-Week Cycle
    </h2>
    <div style="display:grid;gap:1.5rem;margin-bottom:3rem;">
  `;
  
  plan.weeklyPlan.forEach(week => {
    if (week.days) {
      html += `
        <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">
          <div style="background:rgba(255,255,255,0.03);padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.08);font-weight:600;color:#e0f2fe;">${week.week}</div>
          <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;min-width:600px;">
            <thead style="background:rgba(0,0,0,0.2);color:#94a3b8;font-size:0.8rem;text-align:left;">
              <tr>
                <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Day</th>
                <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">English</th>
                <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Maths</th>
                <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Physics</th>
                <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Aptitude</th>
                <th style="padding:0.75rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05);">Electrical</th>
              </tr>
            </thead>
            <tbody style="font-size:0.85rem;color:#cbd5e1;">
              ${week.days.map(d => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.75rem 1.25rem;font-weight:600;color:#38bdf8;">${d.day}</td>
                  <td style="padding:0.75rem 1.25rem;">${d.english}</td>
                  <td style="padding:0.75rem 1.25rem;">${d.maths}</td>
                  <td style="padding:0.75rem 1.25rem;">${d.physics}</td>
                  <td style="padding:0.75rem 1.25rem;">${d.aptitude}</td>
                  <td style="padding:0.75rem 1.25rem;">${d.electrical}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          </div>
        </div>
      `;
    } else {
      html += `
        <div style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1.25rem;">
          <div style="font-weight:600;color:#e0f2fe;margin-bottom:0.5rem;">${week.week}</div>
          <div style="color:#94a3b8;font-size:0.95rem;line-height:1.6;">${week.note}</div>
        </div>
      `;
    }
  });
  html += `</div>`;

  container.innerHTML = html;
}

function startCbtTest(subject) {
  // If exam-renderer.js has loadCBTExam function
  if (typeof startNewExam === 'function') {
    // Generate a quick exam for year 2 and the given subject
    let yearQ = getCBTQuestionsUpToYear(2); // assuming it uses cbt-questions-yearwise
    if (subject !== 'mixed') {
      yearQ = yearQ.filter(q => q.subject === subject);
    }
    
    if (!yearQ || yearQ.length === 0) {
      alert("No questions found for " + subject + " in Year 2 database yet. Check cbt-questions-yearwise.js");
      return;
    }
    
    // Using existing exam renderer setup from interview-ui.js
    let examData = {
      title: `2nd Year ${subject.toUpperCase()} Practice (NYK Pattern)`,
      timeLimit: 45 * 60, // 45 mins
      questions: yearQ.slice(0, 10) // Show a max of 10 for practice session demo
    };
    
    // Hide our page, show exam page via startNewExam
    document.getElementById('cbt2ndYearPage').style.display = 'none';
    startNewExam(examData); // assuming this globally exists from exam-renderer.js
  } else {
    alert("Exam renderer not loaded or found.");
  }
}
