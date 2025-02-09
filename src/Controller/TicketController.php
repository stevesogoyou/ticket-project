<?php

namespace App\Controller;

use App\Entity\Ticket;
use App\Form\TicketType;
use App\Repository\TicketRepository;
use App\Repository\UserRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/api')]
class TicketController extends AbstractController
{
    #[Route('/tickets', name: 'ticket_index', methods: ['GET'])]
    public function index(TicketRepository $ticketRepository): Response
    {
        // Récupère tous les tickets
        $tickets = $ticketRepository->findAll();

        return $this->json($tickets, 200,
            [AbstractNormalizer::GROUPS => ['ticket:read']]);
    }

    #[Route('/tickets/traites', name: 'ticket_traites', methods: ['GET'])]
    public function getTraites(TicketRepository $ticketRepository): Response
    {
        // Récupère les tickets dont le statut est "traité"
        $tickets = $ticketRepository->findBy(['status' => 'traité']);

        return $this->json($tickets, 200,
            [AbstractNormalizer::GROUPS => ['ticket:read']]
        );
    }

    #[Route('/tickets/invalides', name: 'ticket_invalides', methods: ['GET'])]
    public function getInvalides(TicketRepository $ticketRepository): Response
    {
        // Récupère les tickets dont le statut est "invalide"
        $tickets = $ticketRepository->findBy(['status' => 'invalide']);

        return $this->json(
            $tickets,
            200,
            [AbstractNormalizer::GROUPS => ['ticket:read']]
        );
    }
    #[Route('/tickets/nouveaux', name: 'ticket_nouveaux', methods: ['GET'])]
    public function getNouveaux(TicketRepository $ticketRepository): Response
    {
        // Récupère les tickets dont le statut est "nouveau"
        $tickets = $ticketRepository->findBy(['status' => 'nouveau']);

        return $this->json(
            $tickets,
            200,
            [AbstractNormalizer::GROUPS => ['ticket:read']]
        );
    }


    #[Route('/ticket/new', name: 'ticket_new', methods: ['POST'])]
    public function new(
        Request $request,
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        CategoryRepository $categoryRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Validation des données : title, description, category_id et student_id sont requis
        if (empty($data['title']) || empty($data['description']) || empty($data['category_id']) || empty($data['student_id'])) {
            return $this->json(['error' => 'Missing required fields.'], 400);
        }

        // Récupérer la catégorie
        $category = $categoryRepository->find($data['category_id']);
        if (!$category) {
            return $this->json(['error' => 'Category not found.'], 404);
        }

        // Récupérer l'étudiant (user) à partir de student_id
        $student = $userRepository->find($data['student_id']);
        if (!$student) {
            return $this->json(['error' => 'Student not found.'], 404);
        }

        // Création du ticket
        $ticket = new Ticket();
        $ticket->setTitle($data['title']);
        $ticket->setDescription($data['description']);
        $ticket->setCategory($category);
        $ticket->setStudent($student);

        // Sauvegarder le ticket dans la base de données
        $entityManager->persist($ticket);
        $entityManager->flush();

        return $this->json($ticket, 201, [], [\Symfony\Component\Serializer\Normalizer\AbstractNormalizer::GROUPS => ['ticket:read']]);
    }


    #[Route('/tickets/nouveaux/{id}', name: 'ticket_show', methods: ['GET'])]
    public function show(Ticket $ticket): Response
    {
        return $this->render('ticket/show.html.twig', [
            'ticket' => $ticket,
        ]);
    }

    #[Route('/ticket/edit/{id}', name: 'ticket_edit', methods: ['PUT'])]
    public function edit(
        Request $request,
        Ticket $ticket,
        EntityManagerInterface $entityManager
    ): Response {
        $data = json_decode($request->getContent(), true);
        if (null === $data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        // Mise à jour des champs en fonction des données envoyées.
        // Vérifiez et mettez à jour uniquement les champs fournis.
        if (isset($data['title'])) {
            $ticket->setTitle($data['title']);
        }
        if (isset($data['description'])) {
            $ticket->setDescription($data['description']);
        }
        // Vous pouvez ajouter d'autres champs à mettre à jour ici, par exemple le statut :
        if (isset($data['status'])) {
            $ticket->setStatus($data['status']);
        }
        if (isset($data['message_refus'])) {
            $ticket->setMessageRefus($data['message_refus']);
        }
        // Si vous souhaitez mettre à jour d'autres relations, il faudra également
        // récupérer les entités concernées (ex. pour une modification d'assignation).

        $entityManager->flush();

        return $this->json($ticket, Response::HTTP_OK, [], [
            \Symfony\Component\Serializer\Normalizer\AbstractNormalizer::GROUPS => ['ticket:read']
        ]);
    }


    #[Route('/ticket/{id}/delete', name: 'ticket_delete', methods: ['POST'])]
    public function delete(Ticket $ticket, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($ticket);
        $entityManager->flush();

        return $this->redirectToRoute('ticket_index');
    }
}
