import { links } from '../links'
import { Right } from '../style'
import { v4 as uuidv4 } from 'uuid'

const RightSection = () => {
  return (
    <Right>
      {links.map(link => (
        <ul key={uuidv4()}>
          <li>
            <h1>{link.header}</h1>
          </li>
          {link.link.map(link => (
            <div key={uuidv4()}>
              <li>
                <a href={link.URL} target='_blank' rel='noreferrer'>
                  {link.name}
                </a>
              </li>
            </div>
          ))}
        </ul>
      ))}
    </Right>
  )
}

export default RightSection
