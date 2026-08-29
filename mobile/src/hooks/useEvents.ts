import { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
}

interface Event {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  cover_url?: string;
  type: 'cult' | 'reunion' | 'convention' | 'baptism' | 'communion' | 'workshop' | 'social';
  organizer_id: number;
  group_id?: number;
  is_online: boolean;
  stream_url?: string;
  attendees_count: number;
  created_at: string;
  organizer?: User;
  is_attending?: boolean;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar eventos
  const loadEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Carregar eventos da API
      const mockEvents: Event[] = [
        {
          id: 1,
          title: 'Culto Oficial',
          description: 'Culto de domingo na congregação central',
          start_date: '2026-08-30T10:00:00Z',
          end_date: '2026-08-30T12:00:00Z',
          location: 'Congregação Central - São Paulo, SP',
          type: 'cult',
          organizer_id: 1,
          is_online: false,
          attendees_count: 50,
          created_at: '2026-08-29T10:00:00Z',
        },
        {
          id: 2,
          title: 'Reunião de Jovens',
          description: 'Reunião semanal dos jovens',
          start_date: '2026-08-30T19:30:00Z',
          end_date: '2026-08-30T21:00:00Z',
          location: 'Congregação Central - São Paulo, SP',
          type: 'reunion',
          organizer_id: 1,
          is_online: false,
          attendees_count: 30,
          created_at: '2026-08-29T09:00:00Z',
        },
        {
          id: 3,
          title: 'Convenção Anual 2026',
          description: 'Convenção anual da congregação',
          start_date: '2026-09-15T09:00:00Z',
          end_date: '2026-09-17T18:00:00Z',
          location: 'Centro de Convenções - São Paulo, SP',
          type: 'convention',
          organizer_id: 1,
          is_online: false,
          attendees_count: 500,
          created_at: '2026-08-28T10:00:00Z',
        },
      ];
      setEvents(mockEvents);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar eventos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Criar evento
  const createEvent = useCallback(async (data: {
    title: string;
    description?: string;
    start_date: string;
    end_date?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    cover_url?: string;
    type: string;
    group_id?: number;
    is_online?: boolean;
    stream_url?: string;
  }) => {
    try {
      // TODO: Criar evento via API
      const newEvent: Event = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        cover_url: data.cover_url,
        type: data.type as any,
        organizer_id: 1, // TODO: Pegar do usuário logado
        group_id: data.group_id,
        is_online: data.is_online || false,
        stream_url: data.stream_url,
        attendees_count: 0,
        created_at: new Date().toISOString(),
      };

      setEvents((prev) => [newEvent, ...prev]);
      return { success: true, event: newEvent };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao criar evento' };
    }
  }, []);

  // Atualizar evento
  const updateEvent = useCallback(async (eventId: number, data: Partial<Event>) => {
    try {
      // TODO: Atualizar evento via API
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, ...data } : event
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao atualizar evento' };
    }
  }, []);

  // Deletar evento
  const deleteEvent = useCallback(async (eventId: number) => {
    try {
      // TODO: Deletar evento via API
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao deletar evento' };
    }
  }, []);

  // Confirmar presença
  const attendEvent = useCallback(async (eventId: number, status: 'going' | 'interested' | 'not_going' = 'going') => {
    try {
      // TODO: Confirmar presença via API
      setEvents((prev) =>
        prev.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              is_attending: status === 'going',
              attendees_count: status === 'going' ? event.attendees_count + 1 : event.attendees_count - 1,
            };
          }
          return event;
        })
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Erro ao confirmar presença' };
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    isLoading,
    error,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    attendEvent,
  };
};
