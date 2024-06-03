import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { json, useLoaderData } from '@remix-run/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export async function loader() {
  return json({
    ENV: {
      GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
      FSEARCH_ENGINE_ID: process.env.REACT_APP_SEARCH_ENGINE_ID,
    },
  })
}
const imageCache: Record<string, string> = {}
export default function Index() {
  const data = useLoaderData<typeof loader>()
  const [inputValue, setInputValue] = useState('')
  const [webValue, setWebValue] = useState('')
  const [cardTitle, setCardTitle] = useState('Card Title')
  const [cardDes, setWebDes] = useState('Card Description')
  const [imageUrl, setImageUrl] = useState('')
  const handleSubmit = () => {
    setCardTitle(inputValue)
    setInputValue('')
  }

  const handleSubmitweb = async () => {
    setWebDes(webValue)
    setWebValue('')
    const image = await fetchImage(webValue)
    setImageUrl(image)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handlewebChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebValue(e.target.value)
  }

  const fetchImage = async (query: string) => {
    if (imageCache[query]) {
      return imageCache[query]
    }

    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${data.ENV.GOOGLE_API_KEY}&cx=${data.ENV.FSEARCH_ENGINE_ID}&q=${query}&searchType=image&num=1`,
    )
    const info = await response.json()
    const imageUrl = info.items[0].link
    imageCache[query] = imageUrl
    return imageUrl
  }

  return (
    <div>
      <nav className='bg-black flex px-5 py-5 mb-5 text-white text-2xl font-bold'>
        Remix Test
      </nav>
      <div className='flex  space-x-3 px-4 py-4'>
        <Button className='w-auto' onClick={handleSubmit}>
          Submit
        </Button>
        <Input
          className='w-auto'
          placeholder='Card Title'
          value={inputValue}
          onChange={handleChange}
        ></Input>
      </div>
      <div className='flex  space-x-3 px-4 py-4'>
        <Button
          className='w-auto bg-slate-500 rounded-2xl'
          onClick={handleSubmitweb}
        >
          Submit
        </Button>
        <Input
          className='w-80'
          placeholder='What image do you want to search?'
          value={webValue}
          onChange={handlewebChange}
        ></Input>
      </div>
      <div className='flex  flex-col  space-y-4 w-auto px-4 py-4'>
        <div className=' flex w-auto'>
          <Card>
            <CardHeader>
              <CardTitle>{cardTitle}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <p>{cardDes}</p>
              {imageUrl && <img src={imageUrl} alt={cardDes} />}
            </CardContent>
            <CardFooter>
              <Button>Finalized</Button>
            </CardFooter>
          </Card>
        </div>
        <div className='py-4'>
          <RadioGroup defaultValue='option-one'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='option-one' id='option-one' />
              <Label htmlFor='option-one'>One</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='option-two' id='option-two' />
              <Label htmlFor='option-two'>Two</Label>
            </div>
          </RadioGroup>
        </div>
        <div className='py-4'>
          <Calendar />
        </div>
        <div>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-sm px-4  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            What is this?
          </label>
        </div>
        <div className='py-4'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
