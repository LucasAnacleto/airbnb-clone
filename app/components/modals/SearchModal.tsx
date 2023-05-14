'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, {
    CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);



    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    },
        [
            step,
            searchModal,
            location,
            router,
            guestCount,
            roomCount,
            dateRange,
            onNext,
            bathroomCount,
            params
        ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Pesquisar';
        }

        return 'Proximo';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Voltar'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Onde você quer ir?"
                subtitle="Encontre o local perfeito!"
            />
            <CountrySelect
                value={location}
                onChange={(value) =>
                    setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latIng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Quando você planeja ir?"
                    subtitle="Certifique-se de que todos estão livres!"
                />
                <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Mais Informações"
                    subtitle="Encontre o seu lugar perfeito!"
                />
                <Counter
                    onChange={(value) => setGuestCount(value)}
                    value={guestCount}
                    title="Convidados"
                    subtitle="Quantos convidados estão vindo?"
                />
                <hr />
                <Counter
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                    title="Quartos"
                    subtitle="Quantos quartos você precisa?"
                />
                <hr />
                <Counter
                    onChange={(value) => {
                        setBathroomCount(value)
                    }}
                    value={bathroomCount}
                    title="Banheiros"
                    subtitle="De quantos banheiros você precisa?"
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Filtros"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModal.onClose}
            body={bodyContent}
        />
    );
}

export default SearchModal;