'use client';

import { Toast, toast } from "react-hot-toast";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
    reservations: SafeReservation[],
    currentUser: SafeUser | null

}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reserva cancelada");
            router.refresh();
        })
        .catch(() => {
            toast.error("Algo deu errado");
        })
        .finally(() => {
            setDeletingId('')
        })
    }, [router])

    return (
        <Container>
            <Heading 
                title="Reservas"
                subtitle="Reservas em suas propriedades"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-col-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {reservations.map((reservation) => (
                    <ListingCard 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancelar reserva de hóspede"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default ReservationsClient;