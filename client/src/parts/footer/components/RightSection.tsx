import { links } from '../links'
import { Right } from '../style'

const RightSection = () => {
  return (
    <Right>
      {links.map(link => (
        <ul>
          <li>
            <h1>{link.header}</h1>
          </li>
          {link.link.map(link => (
            <>
              <li>
                <a href={link.URL} target='_blank' rel='noreferrer'>
                  {link.name}
                </a>
              </li>
            </>
          ))}
        </ul>
      ))}
    </Right>
  )
}

export default RightSection
