export default function Card({ title, description, link, external }) {
  return (
    
      href={link}
      className="card"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <h3>{title} &rarr;</h3>
      <p>{description}</p>
    </a>
  );
}