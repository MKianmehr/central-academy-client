import React, { useEffect, useRef, useState } from 'react'
import useTranslation from "next-translate/useTranslation";
import styles from './styles.module.scss'
import ReactMarkdown from 'react-markdown'

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeHolder: string;
    title?: string;
}
const MarkdownInput: React.FC<Props> = ({ value, onChange, placeHolder, title }) => {

    const { t } = useTranslation("common")

    const [hidden, setHidden] = useState(false)
    const ref = useRef<HTMLTextAreaElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setHidden(false);
        }
    };

    const updateHeight = () => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        updateHeight()
    }, [value, hidden, ref.current])


    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])


    const onClickHidden = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setHidden(true)
    }

    return (
        <div >
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.container}>
                <div className={styles.header}>
                    <a target="_blank" href='https://www.markdownguide.org/cheat-sheet/'>
                        {t("Markdown Cheat Sheet")}
                    </a>
                </div>
                {hidden && (
                    <textarea
                        value={value}
                        onChange={onChange}
                        className={styles.textarea}
                        ref={ref}
                    />
                )}
                {!hidden && (
                    <div
                        className={styles.markdown}
                        onClick={onClickHidden}
                    >
                        <ReactMarkdown>
                            {value ? value : placeHolder}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MarkdownInput