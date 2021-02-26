---
layout: post
title: "An Ensemble from Tiny Circuit: Quantum Orchestra"
categories: quantum-computing
permalink: /quantum-computing/quantum-orchestra/
---

Every object around the globe can make a piece of music. Not depend on organic matters or inorganic things. Even electric drills and *a sliver hammer* (yes, I’m a Beatles fan. If you want to dispute, call Paul or Ringo) can create remarkably well. As a writer, designer, and developer, I recommend you to put your ears at the side of a monitor or on a computer body, hear those squishing, ticking, and humming sound fully. It’s crucial to understand the implements and utensils you’re using, not because you have to be a superuser. It is, however, an invitation into its world jut within their rhythm of bursting hard drives or an inner device shifting its location.<br /><br />

There is a simple example, which is called ‘Device Orchestra’. It’s a famous YouTube channel shown renewed versions of pop songs, that performed by electric toothbrushes, hairdryers, receipt printers, and typewriters. The brand-new ‘Take on Me’ is magnificent.<br />
<iframe width="560" height="315" src="https://www.youtube.com/embed/NATZy-ZqD7A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br /><br />

The reader will probably be asking: *why should anyone know all of this stuff? I’m just interested in quantum computing/computer science/electrical engineering. I’m out.* Well, because what I’m saying from now is intimately connected with the idea which I’d shown on __Qiskit Hackathon Global 2020__ . And this article is written for introducing it, sharing insights, along with my notion. This is a story of five Qiskit newbies who experience many tribulations and the priceless result during 24 hours. <br />
![img](https://miro.medium.com/max/1400/0*m7TjpZ9cG9kVLvVI "A Poster of Qiskit Hackathon Global 2020") <br /><br />

I, Rohit, Alan, Cynthia, and Quentin were trying to translate a quantum circuit into musical output. This brilliant concept initially came from Daniel, our mentor. He’d come up with an idea when he had thought about an old piano that takes sheet music and plays the song automatically. Every reader will agree with him. In lost childhood memories, everybody might imagine pieces of furniture sing you a lullaby or give you a morning call. That’s when I decided to grasp this suggestion and aim for it. As soon as after that, there’s one objective strike inside my head. Maybe we could turn each qubit into a performer. <br /><br />

And that became true. <br /><br />

Before that, we created a quantum circuit first. When this is developed into a real product, a user could try his or her circuit. After coding circuit to correspond with sets of chords-like E, Am, or B-there will be a music sheet as a result. <br />
Isn’t it wonderful? <br /><br />

Of course, we worked hard, and find our theory; at seven minutes before the deadline! No pain, no gain. <br /><br />

We assigned the four qubits to the gates. It’s called Pauli Gates: Pauli-X, Pauli-Y, and finally, Pauli-Z. There’s five Pauli Gates in our quantum circuits. They equate to a rotation around the each of representing axis. (If you stuck in this part and want to learn quantum computing, you can check on Qiskit official website or my potential blog posts. If you understand what I’m saying, keep reading.) <br /><br />

Those four are the musical instruments: the guitar, the bass, the trumpet, and the piano. Quentin studied for selecting a perfect tone representing Do, Re, Mis. And then a Hadamard gate stimulates any transformation to put each qubit in a state of superposition. We used a Qiskit Terra Mock at the backend. <br /><br />

Next, our circuit runs 1024 times (magic number!), so it’s time for Qiskit’s get_counts() function works. It finds the probability of returning each state and fine their respective amplitude. So that we can calculate these values and a series of chords is appended to an array which will be converted to an audio file(.wav) that could be played withing the Jupyter notebook. And also, it accompanied by sheet music for each qubit. Every process contains the bits of information of quantum, which allows the users to check. <br /><br />

And the extra issues out there. We had to make a presentation slide, kept debugging, and found a source to upgrade our programme, more user-friendly UX, more instruments, or qualified musical output, like a real orchestra’s. <br /><br />

Anyway, the results were okay, and the time was up. We didn’t know the surprise was awaiting us. <br /><br />

__We received the Community Choice Award on Qiskit Hackathon Global 2020!__ <br />
![img](https://media-exp1.licdn.com/dms/image/C5622AQH3KmJwOWM66A/feedshare-shrink_800/0/1610868211966?e=1617235200&v=beta&t=sVZRJ8AgYqk6405B33mvd3cHSUdmlovyKVH0wcWALio "The Arcyrilc Plaque for ME!") <br /><br />

It sounded like a dream. This was the first Hackathon in my life. Before the first week of October, I’d never known what Hackathon means. I imagined Hackathon is a contest for the white hackers. Before August, I’d even gotten a zero information about quantum computing or IBM Qiskit.
It was a miracle to us. Also, it becomes a meaningful reward for such a hard effort, teamwork, and improved knowledge. We have a right to take this award and have a duty to stimulate computational curiosity as students. This is hackathon’s design. <br /><br />

What next? We’re planning to write a paper of OrQiStra (that’s a name of our little circuit) with our extraordinary mentor, Daniel. This pandemic situation is getting worse, and that’s why the plan is kept delayed. But as mankind always do, we’ll find a way to get through. Don’t stop until you have to. That’s my motto. Then we could try anything we have a mind of. Like making OrQiStra a real product or an educational material. <br /><br />

My conclusion is this: every academic field can mix and collide in themselves. In East Asian universities, there’re still lots of stereotypes about one’s occupation. When the student graduates or majors design, he or she is not recommended to become a developer or composer. Students in pre-school can’t avoid this prejudice. It seems that there exists a solid path. We have to go to straightforward when everyone says ‘Don’t go’. It’s not like ‘Don’t Panic’ on The Hitchhiker’s Guide in the Galaxy. ‘Don’t Panic’ is useful, and admittable idiom for the species in the Universe, but the former makes one tear from the inside. It takes out courage and ability. <br /><br />

Don’t go into what others say. You’ll do better in your own pathway, whether it’s a sidewalk or not. This is what Qiskit Hackathon Global 2020 gives me, plus my brilliant teammates. <br /><br />

P.S. You can try if you want. You can join me to enjoy the dazzling combination of whatever you want. Music, computer science, or even creative writing. *Why don’t you make your imagination come true in the upcoming Qiskit Hackathon event which would be held in the next month?* <br /><br />

Qiskit Hackathon *Korea* 2021, wait for us.
