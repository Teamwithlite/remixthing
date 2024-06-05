import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
  const [cardDes, setCardDes] = useState('What image do you want to search?')
  const [imageUrl, setImageUrl] = useState('')
  const handleSubmit = () => {
    setCardTitle(inputValue)
    setInputValue('')
  }

  const handleSubmitweb = async () => {
    setCardDes(webValue)
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
    <div className='container  sm:w-full  px-0  bg-timberwolf '>
      <nav className='container  bg-dirtgray px-5 py-5 rounded-sm text-white text-2xl font-bold'>
        Remix Test
      </nav>
      <div className='lg:grid sm:container lg:grid-cols-2 '>
        <div>
          <div className='px-10 font-bold py-4'>
            What image do you want to search?
          </div>
          <div className='flex space-x-3 px-10 pb-4 '>
            <Button className='w-auto rounded-2xl' onClick={handleSubmit}>
              Submit
            </Button>
            <Input
              className=' sm:w-80 lg:w-80  '
              placeholder='Card Title'
              value={inputValue}
              onChange={handleChange}
            ></Input>
          </div>
          <div className='flex  flex-col  space-y-4 w-auto px-10  py-4'>
            <div className=' flex py-4  w-auto'>
              <Card className='bg-beaver '>
                <CardHeader>
                  <CardTitle>{cardTitle}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className='py-4 space-y-4'>
                  <p>{cardDes}</p>
                  {imageUrl && <img src={imageUrl} alt={cardDes} />}
                </CardContent>
                <CardFooter>
                  <Button>Finalized</Button>
                </CardFooter>
              </Card>
            </div>
            <div className='flex  space-x-3  py-4'>
              <Button className='w-auto rounded-2xl' onClick={handleSubmitweb}>
                Submit
              </Button>
              <Input
                className='w-80'
                placeholder='What image do you want to search?'
                value={webValue}
                onChange={handlewebChange}
              ></Input>
            </div>
            <Separator />
            <div className='font-bold'>Choose your option</div>
            <div className='flex px-10 pb-4 space-y-5'>
              <RadioGroup className='space-y-3' defaultValue='option-one'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='option-one' id='option-one' />
                  <Label htmlFor='option-one'>One</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='option-two' id='option-two' />
                  <Label htmlFor='option-two'>Two</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='option-three' id='option-three' />
                  <Label htmlFor='option-three'>Three</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='option-four' id='option-four' />
                  <Label htmlFor='option-four'>Four</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='option-five' id='option-five' />
                  <Label htmlFor='option-five'>Five</Label>
                </div>
              </RadioGroup>
            </div>
            <Separator />
            <div className=' font-bold'>Calendar</div>
            <div className='px-10'>
              <Calendar />
            </div>
            <Separator />
            <div className='flex  py-4 px-10 items-center space-x-2'>
              <Checkbox id='terms' />
              <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Accept terms and conditions
              </label>
            </div>
            <Separator />
            <div className='font-bold'>Choose your theme</div>
            <div className='px-10 pb-4'>
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
            <Separator />
          </div>
        </div>
        <div>
          <div className='flex'>
            <Separator orientation='vertical' />
            <Tabs defaultValue='account' className='w-[400px] px-10 py-5 '>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='account'>Account</TabsTrigger>
                <TabsTrigger value='password'>Password</TabsTrigger>
              </TabsList>
              <TabsContent value='account'>
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div className='space-y-1'>
                      <Label htmlFor='name'>Name</Label>
                      <Input id='name' defaultValue='Pedro Duarte' />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='username'>Username</Label>
                      <Input id='username' defaultValue='@peduarte' />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value='password'>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div className='space-y-1'>
                      <Label htmlFor='current'>Current password</Label>
                      <Input id='current' type='password' />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='new'>New password</Label>
                      <Input id='new' type='password' />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <Separator />
        </div>
      </div>
    </div>
  )
}
