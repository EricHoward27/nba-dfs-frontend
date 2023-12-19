import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const NewsSlider = ({ articles }: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // change the slide every 3 seconds
            setCurrentSlide((currentSlide) => (currentSlide + 1) % articles.length);

        }, 3000);
        return () => clearInterval(interval);
    }, [articles.length]);

    return(
         <Card>
            <div className='news-column p-4 primary-foreground text-muted-foreground'>
                <CardTitle>
                <h2 className='text-2xl font-bold mb-3'>Top News Stories</h2>
                </CardTitle>
                <CardContent>
                <ul>
                    {articles.map((article: any) => (
                        <li key={articles.id} className='mb-2 hover:bg-yellow-400 p-2 rounded'>
                            <a href={article.url} target='_blank' rel='noopener noreferrer' className='no-underline'>
                            <CardDescription> <p className='text-lg font-semibold'>{article.title}</p></CardDescription> 
                            </a>
                            <CardDescription><p className='text-sm'>{article.source}</p></CardDescription> 
                        </li>
                    ))}
                </ul>
                </CardContent>
            </div>
        </Card>
    );
}
export default NewsSlider;