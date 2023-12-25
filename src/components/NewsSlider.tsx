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
                    Top News Stories
                </CardTitle>
                <CardContent>
                <ul>
                    {articles.map((article: any) => (
                        <li key={article.title} className='mb-2 hover:bg-yellow-400 p-2 rounded'>
                            <a href={article.url} target='_blank' rel='noopener noreferrer' className='no-underline'>
                            <CardDescription>{article.title}</CardDescription> 
                            </a>
                            <CardDescription>{article.source}</CardDescription> 
                        </li>
                    ))}
                </ul>
                </CardContent>
            </div>
        </Card>
    );
}
export default NewsSlider;