import { Heart } from 'lucide-react'
import MutaLogo from '../assets/muta-logo.png'

export const Footer = () => {
    return (
        <footer className="w-full py-6 px-4">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <p className="text-sm text-gray-600">
                        Developed with <Heart className="inline-block w-4 h-4 text-red-500 animate-pulse" /> by
                        <a href="https://github.com/josueperezparejo" target='_blank'><span className="font-semibold"> @josueperezparejo</span></a>
                    </p>
                </div>
                <div className="text-center sm:text-right">

                    <div className='flex gap-2'>
                        <div>
                            <p className="text-sm text-gray-600">
                                Project for <span className="font-semibold">Muta</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                © {new Date().getFullYear()} PokéAPI Characterst.
                            </p>
                        </div>

                        <img className='bg-black p-1 rounded-md' width={40} height={40} src={MutaLogo} alt="" />
                    </div>
                </div>
            </div>
        </footer>
    )
}