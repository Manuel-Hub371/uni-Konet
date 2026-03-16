import 'package:flutter/material.dart';

class PostScreen extends StatelessWidget {
  const PostScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('New Post')),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: TextField(
          maxLines: 5,
          decoration: InputDecoration(hintText: "What's on your mind?"),
        ),
      ),
    );
  }
}
