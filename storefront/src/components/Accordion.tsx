import React from 'react'
import { LocalizedLink } from './LocalizedLink';

interface AccordionProps {
  title: string;
  categories: Record<string, string>[];
  onClick?: () => void;
}

export const Accordion = ({ title, categories, onClick }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
      </div>
      {isOpen && (
        <div
          className={`ml-4 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen transition-opacity delay-150 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
        >
          <div className='overflow-hidden'>
            {categories.map((category, key) => (
              <ul key={key}>
                <li className="text-sm">
                  <LocalizedLink
                    href={`/categories/${category.handle}`}
                    onClick={onClick}
                  >
                    {category.name}
                  </LocalizedLink>
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
