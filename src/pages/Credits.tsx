import { Link } from 'react-router-dom'
import { Page } from '../components/Motion'
import credits from '../credits.json'

export default function Credits() {
  return (
    <Page>
      <div className="container narrow">
        <Link to="/" className="back">לדף הבית</Link>
        <h1>קרדיט לתמונות</h1>
        <p className="lead">כל התמונות באתר מתוך Wikimedia Commons, בשימוש לפי הרישיון של כל תמונה.</p>
        <ul className="credits">
          {credits.map((c) => (
            <li key={c.file} className="card">
              <img src={c.file} alt="" />
              <div>
                <b dir="ltr">{c.title}</b>
                <span className="muted" dir="ltr">{c.author} · {c.license}</span>
                <a href={c.source} target="_blank" rel="noreferrer">מקור</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  )
}
