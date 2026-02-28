import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('الملف الشخصي'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              children: [
                // Profile Header Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(32.0),
                    child: Column(
                      children: [
                        Stack(
                          alignment: Alignment.bottomRight,
                          children: [
                            const CircleAvatar(
                              radius: 60,
                              backgroundColor: Color(0xFF1E3A8A),
                              child: Text('M', style: TextStyle(fontSize: 48, color: Colors.white, fontWeight: FontWeight.bold)),
                            ),
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: const BoxDecoration(
                                color: Color(0xFFD97706),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(LucideIcons.camera, color: Colors.white, size: 20),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        const Text('محمد ملوك', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A))),
                        const SizedBox(height: 8),
                        const Text('سوبر أدمن / أستاذ باحث', style: TextStyle(fontSize: 16, color: Color(0xFFD97706), fontWeight: FontWeight.bold)),
                        const SizedBox(height: 24),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            _buildContactInfo(LucideIcons.mail, 'm.mellouk@elite-univ.dz'),
                            const SizedBox(width: 24),
                            _buildContactInfo(LucideIcons.phone, '+213 555 123 456'),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                
                // Stats Row
                Row(
                  children: [
                    Expanded(child: _buildStatCard(context, 'الأبحاث', '12', LucideIcons.bookOpen, Colors.blue)),
                    const SizedBox(width: 16),
                    Expanded(child: _buildStatCard(context, 'العقود', '45', LucideIcons.fileSignature, Colors.green)),
                    const SizedBox(width: 16),
                    Expanded(child: _buildStatCard(context, 'التقييم', '4.9', LucideIcons.star, Colors.amber)),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildContactInfo(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, size: 16, color: Colors.grey),
        const SizedBox(width: 8),
        Text(text, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.w500), textDirection: TextDirection.ltr),
      ],
    );
  }

  Widget _buildStatCard(BuildContext context, String title, String value, IconData icon, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: 28),
            ),
            const SizedBox(height: 16),
            Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(title, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}
