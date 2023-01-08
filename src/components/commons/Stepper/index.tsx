import React, { useCallback, useRef, useMemo } from 'react'
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import Step from '@mui/material/Step';
import Check from '@mui/icons-material/Check';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { useAppSelector } from '../../../redux/hooks';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { StepperProp } from '../../../models/Props';
import { StepperChildProp } from '../../../models/Props';
import { Button } from '@mui/material';
import styles from './styles.module.scss'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            margin: "2px"
        },
    }),
);

function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const Index: React.FC<StepperProp> = ({ children }) => {
    const { t } = useTranslation("common")
    const steps = useAppSelector(state => state.createCourseSteps.steps)
    const router = useRouter()
    const activeStep = parseInt(router.query.step as string, 10) - 1
    const stepperRef = useRef<StepperChildProp>()
    const currentRoute = parseInt(router.query.step as string, 10)
    const title = useMemo(() => t(stepperRef.current?.title as string), [stepperRef.current])
    const isOkay = useMemo(() => t(stepperRef.current?.isOkay as string), [stepperRef.current])

    const onNextButtonClick = useCallback(() => {
        const validToGo = stepperRef.current?.onNextButtonClick()
        if (validToGo && currentRoute < steps.length) {
            router.push(`/course/create/${currentRoute + 1}`)
        }
    }, [currentRoute])

    const onCompleteButtonClick = useCallback(() => {
        const validToGo = stepperRef.current?.onNextButtonClick()

        if (validToGo && (currentRoute == steps.length)) {
            //  do after
            console.log("complete")
        }
    }, [])

    const onPreviousButtonClick = useCallback(() => {
        router.push(`/course/create/${currentRoute - 1}`)
    }, [currentRoute])

    const onExitButtonClick = useCallback(() => {
        router.push("/instructor/courses")
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.createBox}>
                <Stepper activeStep={activeStep} connector={<QontoConnector />}>
                    {steps.map((step, index) => {
                        const isActive = activeStep > index
                        return (
                            <Step key={index} completed={isActive}>
                                <StepLabel StepIconComponent={QontoStepIcon}>
                                    <span className={styles.labelText}>{t(`${step}`)}</span>
                                </StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <div className={styles.questionsBox}>
                    <div>
                        <h3 className={styles.title}>{title}</h3>
                        {isOkay && <p className={styles.okay}>{isOkay}</p>}
                    </div>

                    {React.cloneElement(children, {
                        ref: stepperRef
                    })}
                    <div className={styles.buttonBox}>
                        <div className={styles.twoButton}>
                            <Button onClick={onExitButtonClick} variant="outlined">{t("exit")}</Button>
                            {currentRoute > 1 && (
                                <Button onClick={onPreviousButtonClick} variant="outlined">{t("previous")}</Button>
                            )}
                        </div>
                        {currentRoute < steps.length && (
                            <Button onClick={onNextButtonClick} variant="outlined">{t("next")}</Button>
                        )}
                        {currentRoute == steps.length && (
                            <Button onClick={onCompleteButtonClick} variant="outlined">{t("create")}</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index